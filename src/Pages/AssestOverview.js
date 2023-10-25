import styled from '@emotion/styled'
import { Box, Button, Container, Grid, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { WalletRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

// NFT overview card styles
const ArtWrap = styled('img')(() => ({
    borderRadius: 30,
    border: "#6a6a6a",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10
}))

// Styling the purchasing dialog
const ModalBox = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 690,
    minHeight: 500,
    backgroundColor: '#FFF',
    boxShadow: 24,
    borderRadius: 13,
    padding: 12,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center'
}))

// Export a assest overview and details 
export default function AssestOverView(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const username = localStorage.getItem("username")
    const asset_id = `${props.id}`
    const price = `${props.price}`
    const owner = props.own
    const name = props.name

    // Function to purchase an asset
    const purchase = () => {
        if (username == props.own) {
            alert("This is already purchased!")
        } else {
            axios
                .post("http://localhost:8000/purchase", {
                    user: username,
                    asset_id: asset_id,
                    asset_name: name,
                    price: price,
                    from_: owner
                }).then(() => {
                    alert("Succefully purchased this item!")
                    window.location.reload();
                }).catch((e) => {
                    console.log({ username, asset_id, price, owner })
                })
        }
    }

    return (
        <Container fixed >
            <Grid container>
                <Stack pt={10} useFlexGap flexDirection="row" alignItems='center' flexWrap="wrap" spacing={6}>
                    <Grid item xs={11} md={5}>
                        <ArtWrap width="100%" alt='art' src={props.src} />
                    </Grid>
                    <Grid item >
                        <Stack>
                            <Typography fontWeight={700} variant='h4'>{props.name}</Typography>
                            <Typography fontWeight={400} variant='body1'>Owned by {props.own}</Typography>
                            <Stack flexDirection='row' alignItems='center' mt={2} mb={2}>
                                <BookmarkIcon />
                                <Typography fontWeight={500} variant='body1' textTransform='uppercase'>{props.type}</Typography>
                            </Stack>
                            <Stack flexDirection='column' alignItems='left' mt={2} mb={2}>
                                <Typography fontWeight={400} variant='body1'>Price</Typography>
                                <Typography fontWeight={700} variant='h5'>{props.price} ETH</Typography>
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
                            }} variant="contained" onClick={handleOpen} endIcon={<ShoppingCartIcon />}>
                                Buy Now
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <ModalBox>
                                    <ArtWrap width="50%" alt='art' src={props.src} />
                                    <Typography mt={3} variant='h6'>Price</Typography>
                                    <Typography >{props.price}</Typography>
                                    <Button fontWeight={700} sx={{
                                        backgroundColor: '#ff4848',
                                        height: '50px',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: 18,
                                        marginTop: 3,
                                        marginBottom: 3,
                                        '&: hover': {
                                            backgroundColor: '#9d0000'
                                        }
                                    }} variant="contained" onClick={purchase} to="/profile/activity" endIcon={<WalletRounded />}>
                                        Checkout
                                    </Button>
                                </ModalBox>
                            </Modal>
                        </Stack>
                    </Grid>
                </Stack>
            </Grid>
        </Container>
    )
}