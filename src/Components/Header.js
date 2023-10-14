import { Container, Link, Stack, styled, alpha, InputBase, Button } from "@mui/material"
import { Logo, SearchBox } from "./Components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SearchResults from "../Pages/SearchResults";

// Header styles
const HeaderContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: '100px',
    flexWrap: "wrap"
}))

// Search
const Search = styled('form')(({ theme }) => ({
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
    maxWidth: '600px'
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

export function Header() {
    const [keyword, setKeyword] = useState(null)

    const [Resulthandle, setResulthandle] = useState(false)

    const OpenResultDialog = () => {
        setResulthandle(true)
    }

    const CloseResultDialog = () => {
        setResulthandle(false)
    }

    const handle = (e) => {
        setKeyword(e.target.value)
    }
    const search = (e) => {
        e.preventDefault();
        if (keyword != null) {
            OpenResultDialog()
        }
    }
    return (
        <Container fixed>
            <Dialog
                fullWidth='true'
                maxWidth='md'
                open={Resulthandle}
                onClose={CloseResultDialog}
                scroll='body'
            >
                <DialogTitle>Search Results</DialogTitle>
                <SearchResults keyword={keyword} />
                <DialogActions>
                    <Button onClick={CloseResultDialog}>Close</Button>
                </DialogActions>
            </Dialog>
            <HeaderContainer>
                <Logo />
                <Stack flexDirection="row">
                    <Search onSubmit={search}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handle}
                        />
                    </Search>
                    <Link color='#000' href='/profile'>
                        <AccountCircleIcon fontSize='large' />
                    </Link>
                </Stack>
            </HeaderContainer>
        </Container>
    )
}