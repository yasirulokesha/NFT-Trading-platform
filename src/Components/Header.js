import { Container, styled } from "@mui/material"
import { Logo, Group, SearchBox } from "./Components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// Header
const HeaderContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: '100px'
}))

export function Header() {
    return (
        <Container fixed>
            <HeaderContainer>
                <Logo/>
                <Group>
                    <SearchBox />
                    <AccountCircleIcon fontSize='large' />
                </Group>
            </HeaderContainer>
        </Container>
    )
}