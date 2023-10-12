import styled from '@emotion/styled';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';

// Register form styles
const ContainerWrap = styled(Paper)(({ theme }) => ({
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
export default function AddAccount() {

    // Get Password and Username
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [wallet, setwalletAddress] = useState('')
    const [balance, setbalance] = useState('')

    const [error_msg, setError_msg] = useState('')
    const [error, setError] = useState(false)

    // Forward in successfull
    const navigate = useNavigate();

    // Checking filled password and username
    const register = (e) => {
        e.preventDefault();
        if ((username === "") || (password === "") || (wallet === "") || (balance === "")) {
            setError_msg("Fill all fields!")
            setError(true)
        } else {
            if (!isNaN(parseFloat(balance)) && balance.trim() !== ' ') {
                axios
                    .post("http://localhost:8000/add_account", {
                        username: username,
                        password: password,
                        wallet: wallet,
                        balance: balance
                    })
                    .then((response) => {
                        if (response.data) {
                            // alert("Registered Successfully");
                            navigate("/login");
                        } else {
                            setError_msg(response.data.error)
                        }
                    });
            } else {
                setError_msg("Enter valid wallet balance!")
                setError(true)
            }

        }
    }

    return (
        <Container sx={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4
        }} fixed>
            <ContainerWrap elevation={24}>
                <Typography pl={1} mt={5} fontSize={30} fontWeight={600}>Register</Typography>
                <Stack sx={{ width: '100%', maxWidth: '400px' }} mt={3}>
                    <Typography pl={1} fontWeight={400}>Username</Typography>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        sx={{
                            padding: 2
                        }}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Typography pl={1} fontWeight={400}>Wallet Number</Typography>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        sx={{
                            padding: 2
                        }}
                        onChange={(e) => setwalletAddress(e.target.value)}
                    />
                    <Typography pl={1} fontWeight={400}>Wallet balance</Typography>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        sx={{
                            padding: 2
                        }}
                        onChange={(e) => setbalance(e.target.value)}
                    />
                    <Typography pl={1} fontWeight={400}>Password</Typography>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        sx={{
                            padding: 2
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Snackbar open={error} autoHideDuration={600} >
                        <Alert severity="error" sx={{ width: '100%' }} >
                            <Typography>{error_msg}</Typography>
                        </Alert>
                    </Snackbar>
                    <Button onClick={register} sx={{ width: 'min-content', marginTop: 2, marginBottom: 6, marginLeft: 2, backgroundColor: '#00897b' }} variant="contained" href="/login">
                        Register
                    </Button>
                    <Typography pl={3} pb={5}>Do you have already account? 
                        <Link sx={{
                            color: '#00aaff',
                            fontWeight: "600"
                        }} underline="none" href="/login" > Login
                        </Link>
                    </Typography>
                </Stack>
            </ContainerWrap>
        </Container>
    )
}