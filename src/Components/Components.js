import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Stack, Typography, FormControl } from '@mui/material';
import logo from '../Assests/logo.png'
import Link from '@mui/material/Link';
import WalletCard from '../Assests/walletCard.webp'
import { useHistory } from 'react-router-dom';
import SearchResults from '../Pages/SearchResults';


// Main styled --------------------------------------------------------------------------------------------------------------------------------------------------

// Logo
const LogoStyles = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

}))
export function Logo() {
    return (
        <LogoStyles>
            <Link href='/'>
                <img src={logo} alt='logo' width="230px"></img>
            </Link>
        </LogoStyles>
    )
}

// Developer tag
export function Devtag() {
    return (
        <Container fixed>
            <Box sx={{
                width: "100%",
                height: 2,
                bgcolor: "#C4C4C4",
                mt: 5
            }}></Box>
            <Typography textAlign="center" margin="auto" fontSize="10pt" mt={2} mb={2}>
                2023-COS30049-Computing Technology Innovation Project
            </Typography>
        </Container>
    )
}

// Wallet Preview
const WalletWrap = styled('div')(({ theme }) => ({
    width: 600,
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))
const WalletNumber = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    marginTop: 64,
    marginLeft: 41.3,
    color: '#FFF',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
        marginTop: '10%',
        marginLeft: '6%',
        fontSize: 10
    }
}))
const Balance = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    marginTop: -59,
    marginLeft: 91.3,
    color: '#FFF',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
        marginTop: '-8.5%',
        marginLeft: '13.7%',
        fontSize: 10
    }
}))
export function WalletPreview(props) {
    return (
        <WalletWrap>
            <WalletNumber>#{props.wallet}</WalletNumber>
            <img width="100%" alt='WalletBack' src={WalletCard} />
            <Balance>{props.balance}ETH</Balance>
        </WalletWrap>
    )
} 

// Components --------------------------------------------------------------------------------------------------------------------------------------------------

// Assest - NFT Card
const AssestBlock = styled('div')(
    ({ theme }) => (
        {
            display: "flex",
            flexDirection: 'column',
            width: 250,
            padding: 10,
            transition: theme.transitions.create('filter'),
            '&:hover': {
                transform: "scale(1.002)",
                transitionDuration: "300ms",
                filter: "drop-shadow(5px 17px 54px rgba(0, 0, 0, 0.30))",
            }
        }
    )
)
const AssestPhoto = styled('img')(() => ({
    display: "block",
    backgroundColor: "#57cc99",
    width: '100%',
    height: 250,
    borderRadius: '10px',
    overflow: 'hidden'
}))
export function Assest(Props) {
    return (
        <AssestBlock>
            <AssestPhoto src={Props.src} alt="NFT" />
            <Stack flexDirection="row" alignItems="center">
                <Container>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16pt', m: 0 }}>
                        {Props.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'medium', fontSize: '10pt', m: 0 }}>
                        {Props.price}ETH
                    </Typography>
                </Container>
            </Stack>
        </AssestBlock>
    )
}


// Link styles
export function SubLink(props) {
    const is_active = props.active;
    if (is_active) {
        return (
            <Link sx={{
                color: '#00aaff',
                '&: hover': {
                    color: "#0004"
                }
            }} underline="none" href={props.to} >
                <Typography m="10px" variant='h6' >{props.placeholder}</Typography>
            </Link>
        )
    } else {
        return (
            <Link sx={{
                color: '#000',
                '&: hover': {
                    color: "#0004"
                }
            }} underline="none" href={props.to} >
                <Typography m="10px" variant='h6' >{props.placeholder}</Typography>
            </Link>
        )
    }

}

export function CustomLink(props) {
    return (
        <Link sx={{ color: '#000' }} href={props.to} underline="none"  >
            {props.element}
        </Link>
    )
}