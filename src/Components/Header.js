import { Container, Stack, styled } from "@mui/material"
import { Logo, SearchBox } from "./Components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// Header
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
                <Logo/>
                <Stack flexDirection="row" p={1}>
                    <SearchBox />
                    <AccountCircleIcon fontSize='large' />
                </Stack>
            </HeaderContainer>
        </Container>
    )
}