import { Container, Grid, Link, Stack, Typography, styled } from "@mui/material"
import { Logo } from "./Components"


// Header
const FooterStyles = styled('footer')(() => ({
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginTop: 100
}))

export function Footer() {
    return (
        <FooterStyles>
            <Container fixed>
                <Grid container pt={10} pb={10} >
                    <Grid md={5} sm={12} item >
                        <Logo />
                    </Grid>
                    <Grid xs={7} item>
                        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={20}>
                            <Stack>
                                <Typography pb={1} fontWeight={700}>Company</Typography>
                                <Typography pb={1}>About</Typography>
                                <Typography pb={1}>Contact</Typography>
                            </Stack>
                            <Stack>
                                <Typography pb={1} fontWeight={700}>Profile</Typography>
                                <Typography>Register</Typography>
                                <Typography component={Link} color="#000" underline="none" href="/login">Login</Typography>
                                <Typography>F&Q</Typography>
                                <Typography component={Link} color="#000" underline="none" href="/login">Profile</Typography>
                            </Stack>
                            <Stack>
                                <Typography pb={1} fontWeight={700}>Learn</Typography>
                                <Typography>What is a NFT?</Typography>
                                <Typography>What is a BlockChain?</Typography>
                                <Typography>What is a Crypto wallet?</Typography>
                            </Stack>
                            <Stack>
                                <Typography pb={1} fontWeight={700}>Market</Typography>
                                <Typography component={Link} color="#000" underline="none" href="/">All</Typography>
                                <Typography component={Link} color="#000" underline="none" href="/gaming">Gaming</Typography>
                                <Typography component={Link} color="#000" underline="none" href="/art">Art</Typography>
                                <Typography component={Link} color="#000" underline="none" href="/photography">Photography</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </FooterStyles>
    )
}