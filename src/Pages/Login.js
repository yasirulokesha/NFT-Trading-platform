import styled from '@emotion/styled';
import { Button, Container, IconButton, InputAdornment, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { fetchToken, setToken } from '../Auth';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Login form styles
const LoginWrap = styled(Paper)(({ theme }) => ({
    borderRadius: 20,
    width: '100%',
    maxWidth: 500,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
}))

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Export the login UI 
export default function Login() {

    // Get Password and Username
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error_msg, setError_msg] = useState('')
    const [error, setError] = useState(false)

    // Forward in successfull
    const navigate = useNavigate();

    // Checking filled password and username
    const login = (e) => {
        e.preventDefault();
        if ((username === "") && (password === "")) {
            setError_msg("Fill the username and password")
            setError(true)
        } else {
            axios
                .post("http://localhost:8000/login", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    console.log(response.data.token, "response.data.token");
                    if (response.data.token) {
                        setToken(response.data.token);
                        navigate("/profile");
                    }
                })
                .catch((error) => {
                    console.log(error, "error")
                    setError_msg("Invalid username or password")
                    setError(true)
                });
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container sx={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4
        }} fixed>
            <LoginWrap elevation={24}>
                {fetchToken() ? (
                    <p>You are already logged in.</p>
                ) : (
                    <Stack sx={{ width: '100%', maxWidth: '400px' }} mt={3}>
                        <Typography pl={1} fontWeight={600}>Username</Typography>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={4}
                            sx={{
                                marginTop: 1,
                                marginBottom: 2,
                                padding: 2
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography pl={1} fontWeight={600}>Password</Typography>
                        <OutlinedInput
                            sx={{
                                margin: 2
                            }}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Snackbar open={error} autoHideDuration={6000} >
                            <Alert severity="error" sx={{ width: '100%' }} >
                                <Typography>{error_msg}</Typography>
                            </Alert>
                        </Snackbar>
                        <Button onClick={login} sx={{ width: 'min-content', marginTop: 2, marginBottom: 6, marginLeft: 2 }} variant="outlined" href="/profile">
                            Login
                        </Button>
                    </Stack>
                )}
            </LoginWrap>
        </Container>
    )
}