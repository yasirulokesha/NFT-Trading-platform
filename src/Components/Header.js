import { Button, Container, Link, Stack, styled } from "@mui/material"
import { Logo, SearchBox } from "./Components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

export function Header() {
    return (
        <Container fixed>
            <HeaderContainer>
                <Logo />
                <Stack flexDirection="row">
                    <SearchBox />
                    <Link color='#000' href='/profile'>
                        <AccountCircleIcon fontSize='large' />
                    </Link>
                    <Button fontWeight={700} LinkComponent="a" href="/login" size="small" ml={2} variant="contained">
                        Login
                    </Button>
                </Stack>
            </HeaderContainer>
        </Container>
    )
}