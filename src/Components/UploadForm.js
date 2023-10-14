import axios from 'axios'

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import { Typography, Stack, TextField, Container } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from '@mui/material/Link';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { storage } from './Firebase'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AssestUpload(props) {
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [assestName, setAssestName] = useState(null)
    const [price, setPrice] = useState(null)
    const [category, setCategory] = useState(null)
    const username = localStorage.getItem("username")
    const [ImageURL, setImageURL] = useState(null)

    const [ShowForm, setShowForm] = useState(true)

    const [status, setstatus] = useState(null)
    const [msg, setmsg] = useState(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const SelectAssest = (e) => {
        const file = e.target.files[0];
        setImage(file);
        console.log(image)

        // Create a URL for the uploaded image to display in the preview
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const upload = async () => {
        if (image == null || assestName == null || price == null || category == null) {
            setstatus("error")
            setmsg("Fill the all details !")
            setSnackbarOpen(true)
        } else {
            const assetRef = ref(storage, `Assets/${v4()}`)


            uploadBytes(assetRef, image)
                .then(() => {
                    getDownloadURL(assetRef)
                        .then((url) => {
                            // setImageURL(url)
                            axios
                                .post('http://localhost:8000/upload', {
                                    asset: url,
                                    name: assestName,
                                    owner: username,
                                    price: price,
                                    category: category
                                })
                                .then(response => {
                                    // Handle the response from the FastAPI backend
                                    if (response) {
                                        if (response.data.msg = "uploaded") {
                                            setstatus("success")
                                            setmsg("Successfully Uploaded!")
                                            setSnackbarOpen(true)
                                            setShowForm(false)
                                        }
                                    } else {
                                        setstatus("error")
                                        setmsg("Error in prccess!")
                                        setSnackbarOpen(true)
                                    }
                                })
                                .catch(error => {
                                    // Handle errors
                                    setstatus("error")
                                    setmsg("Serverity Error!")
                                    setSnackbarOpen(true)
                                });
                        })
                })
                .catch(() => {
                    alert("failed")
                })




        }


    }

    return (
        <Container>
            {ShowForm ? (
                <>
                    <IconButton sx={{ width: 'inherit', m: 'auto', mb: '20px', }} component="label">
                        {!image ? (
                            <Stack sx={{
                                width: 'inherit',
                                maxWidth: '300pt',
                                height: '300pt',
                                display: 'flex',
                                borderStyle: 'dashed',
                                borderRadius: '24px',
                                justifyContent: 'center'
                            }} alignItems='center'>
                                <CloudUploadIcon fontSize='large' />
                                <Typography>Upload Your NFT</Typography>
                                <DialogContentText>
                                    Keep using .jpg, .png formats
                                </DialogContentText>
                                <VisuallyHiddenInput onChange={SelectAssest} type="file" accept='.jpg,.jpeg,.png' />
                            </Stack>
                        ) : (
                            <img width="100%" src={imagePreview} alt='Uploaded'></img>
                        )}

                    </IconButton>

                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: '100%',
                        }}
                    >
                        <InputLabel>Name</InputLabel>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={4}
                            sx={{
                                marginTop: 1,
                                marginBottom: 2,
                            }}
                            placeholder="Assest Name"
                            onChange={(e) => { setAssestName(e.target.value) }}
                        />
                        <InputLabel>Price</InputLabel>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={4}
                            sx={{
                                marginTop: 1,
                                marginBottom: 2,
                            }}
                            placeholder="ETH"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <InputLabel>Category</InputLabel>
                        <Select
                            autoFocus
                            placeholder='NFT Category'
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                        >
                            <MenuItem value="gaming">Gaming</MenuItem>
                            <MenuItem value="future">Future</MenuItem>
                            <MenuItem value="art">Art</MenuItem>
                            <MenuItem value="photography">Photography</MenuItem>
                        </Select>
                        <Snackbar open={snackbarOpen} autoHideDuration={600} >
                            <Alert severity={status} sx={{ width: '100%' }} >
                                <Typography>{msg}</Typography>
                            </Alert>
                        </Snackbar>
                        <FormControl sx={{ mt: 2, maxWidth: 120 }}>
                            <Button onClick={upload} component="label" variant="contained" startIcon={<PublishIcon />}>
                                Upload
                            </Button>
                        </FormControl>
                    </Box>
                </>
            )
                : (
                    <Stack justifyContent='center' alignItems='center' height={300}>
                        <CheckCircleIcon fontSize='large' color={status} />
                        <Typography fontWeight={400}>Your NFT uploaded successfully!</Typography>
                        <Link sx={{
                            color: '#00aaff',
                            fontWeight: "600",
                            fontSize: 20,
                            marginTop: 10
                        }} underline="none" href="/login" > Go Home
                        </Link>
                    </Stack>
                )}

        </Container>
    );
}