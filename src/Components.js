import React from 'react'
import { styled, alpha, createTheme, makeStyles } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Typography } from '@mui/material';



// Main styled --------------------------------------------------------------------------------------------------------------------------------------------------

// Grouping - Horizontally
const Group = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center'
}))

// Logo
const Logo = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70px',
    width: '70px',
    backgroundColor: "red"
}))

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



// Components --------------------------------------------------------------------------------------------------------------------------------------------------

// Assest - NFT Card
const AssestBlock = styled('div')(
    () => (
        {
            display: "flex",
            flexDirection: 'column',
            width: 250,
            '&:hover': {
                transform: "scale(1.002)",
                transitionDuration: "500ms",
                transitionTimingFunction: "ease",
                filter: "drop-shadow(5px 17px 54px rgba(0, 0, 0, 0.15))"
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
            <Group>
                <ProfilePic src={Props.src} width="50px" />
                <Container>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16pt', m:0}}>
                        {Props.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'medium', fontSize: '10pt', m:0}}>
                        {Props.price}
                    </Typography>
                </Container>
            </Group>
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
        width: '100%'
        // padding: theme.spacing(1, 1, 1, 0),
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        // transition: theme.transitions.create('width'),
        // width: '90%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '12ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
}));
const ShortcutSymbol = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4B4B4',
    borderRadius: "7px"
}))
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
            {/* <ShortcutSymbol>/</ShortcutSymbol> */}
        </Search>
    )
}

// Header
const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // maxWidth: '1300px',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: '100px'
}))
export function NavBar() {
    return (
        <Container fixed>
            <Header>
                <Logo >
                    <a href='#'>Logo</a>
                </Logo>
                <Group>
                    <SearchBox />
                    <AccountCircleIcon fontSize='large' />
                </Group>
            </Header>
        </Container>
    )
}