import styled from '@emotion/styled';
import { Button, Container, IconButton, InputAdornment, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchToken } from '../Auth';

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

// Export the login UI 
export default function Login() {

    // Get Password and Username
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Forward in successfull
    const navigate = useNavigate();

    // Checking filled password and username
    const login = () => {
        if ((username === "") && (password === "")) {
            return;
        } else {
            <p>hi</p>
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
                        <Button onClick={login} sx={{ width: 'min-content', marginTop: 2, marginBottom: 6, marginLeft: 2 }} variant="outlined" href="/profile">
                            Login
                        </Button>
                    </Stack>
                )}
            </LoginWrap>
        </Container>
    )
}