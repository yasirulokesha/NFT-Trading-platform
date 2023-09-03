import styled from '@emotion/styled';
import { Button, Container, IconButton, InputAdornment, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import WalletPrev from '../Assests/walletprev.webp';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Login form styles
const LoginWrap = styled(Paper)(({ theme }) => ({
    borderRadius: 20,
    width: '100%',
    maxWidth: 700,
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
                <img style={{ marginTop: 20 }} src={WalletPrev} alt='Wallet' width='80%' />
                <Stack sx={{ width: '100%', maxWidth: '564px' }} mt={3}>
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
                    />
                    <Button sx={{width: 'min-content', marginTop: 2, marginBottom: 6, marginLeft: 2 }} variant="outlined" href="/profile">
                        Login
                    </Button>
                </Stack>
            </LoginWrap>
        </Container>
    )
}