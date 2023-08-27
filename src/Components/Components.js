import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Stack, Typography } from '@mui/material';
import logo from '../Assests/logo.png'
import Link from '@mui/material/Link';

// Main styled --------------------------------------------------------------------------------------------------------------------------------------------------

// Logo
const LogoStyles = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    overflow: 'hidden'
    // backgroundColor: "red"
}))
export function Logo() {
    return (
        <LogoStyles>
            <Link href='/'>
                <img src={logo} alt='logo' width="250px"></img>
            </Link>
        </LogoStyles>
    )
}

// Profile
const ProfPicStyles = styled("img")(() => ({
    borderRadius: '100%',
    backgroundColor: "#B5B5B5",
    margin: 10
}))
export function ProfilePic(props) {
    return (
        <ProfPicStyles src={props.src} alt='Profile picture' width={props.width} />
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

// Link
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

export function CustomLink(props,{children}) {
    <Link sx={{
        color: '#000',
        '&: hover': {
            color: "#0004"
        }
    }} underline="none" href={props.to} >
        {children}
    </Link>
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
    backgroundColor: "red",
    width: '100%',
    height: 250,
    borderRadius: '10px',
    overflow: 'hidden'
}))
export function Assest(Props) {
    return (
        <AssestBlock>
            <AssestPhoto src={Props.src} alt="sample" />
            <Stack flexDirection="row" alignItems="center">
                <ProfilePic src={Props.src} width="50px" />
                <Container>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16pt', m: 0 }}>
                        {Props.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'medium', fontSize: '10pt', m: 0 }}>
                        {Props.price}
                    </Typography>
                </Container>
            </Stack>
        </AssestBlock>
    )
}

// Search
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "8px",
    backgroundColor: alpha("#D9D9D9", 1),
    '&:hover': {
        backgroundColor: alpha("#D9D9D9", 0.25),
    },
    marginLeft: 0,
    marginRight: 20,
    width: '100%',
    height: '39px',
    maxWidth: '600px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#B4B4B4',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
export function SearchBox() {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}
