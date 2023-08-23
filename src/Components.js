import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

// SearchBox
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "8px",
    backgroundColor: alpha("#D9D9D9", 1),
    '&:hover': {
        backgroundColor: alpha("#D9D9D9", 0.25),
    },
    marginLeft: 0,
    width: '100%',
    maxWidth: '400px',
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
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
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

// Header
const Header = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    maxWidth: '1300px'
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

export function NavBar() {
    return (
        <Header>
            <SearchBox />
            <AccountCircleIcon fontSize='large'/>
        </Header>
    )
}