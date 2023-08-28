import styled from '@emotion/styled'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ArtWrap = styled('img')(() => ({
    width: "100%",
    borderRadius: 30,
    border: "#6a6a6a",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10
}))

const AssestContainer = styled('div')(({theme})=>({
}))

// [theme.breakpoints.down('sm')]: {
//     backgroundColor: theme.palette.secondary.main,
// },

export default function AssestOverView(props) {
    return (
        <Container fixed >
            <Grid container>
                <Stack pt={10} useFlexGap flexDirection="row" alignItems='center' flexWrap="wrap" spacing={6}>
                    <Grid item xs={11} md={5}>
                        <ArtWrap alt='art' src={props.src} />
                    </Grid>
                    <Grid item >
                        <Stack>
                            <Typography fontWeight={700} variant='h4'>{props.name}</Typography>
                            <Typography fontWeight={400} variant='body1'>Owned by {props.own}</Typography>
                            <Stack flexDirection='row' alignItems='center' mt={2} mb={2}>
                                <BookmarkIcon />
                                <Typography fontWeight={400} variant='body1'>{props.type}</Typography>
                            </Stack>
                            <Stack flexDirection='column' alignItems='left' mt={2} mb={2}>
                                <Typography fontWeight={400} variant='body1'>Price</Typography>
                                <Typography fontWeight={700} variant='h5'>{props.price}</Typography>
                            </Stack>
                            <Button fontWeight={700} sx={{
                                backgroundColor: '#00A3FF',
                                height: '50px',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: 18,
                                '&: hover': {
                                    backgroundColor: '#52C1FF'
                                }
                            }} variant="contained" endIcon={<ShoppingCartIcon />}>
                                Buy Now
                            </Button>
                        </Stack>
                    </Grid>
                </Stack>
            </Grid>
        </Container>
    )
}