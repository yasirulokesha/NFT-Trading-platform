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

    return (
        <Container>
            <IconButton sx={{ m: 'auto', mb: '20px', }} component="label">
                <Stack sx={{
                    width: '300pt',
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
                    <VisuallyHiddenInput type="file" accept='.jpg,.jpeg,.png' />
                </Stack>
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
                />
                <InputLabel>Category</InputLabel>
                <Select
                    autoFocus
                    value='xs'
                >
                    <MenuItem value="gaming">Gaming</MenuItem>
                    <MenuItem value="future">Future</MenuItem>
                    <MenuItem value="art">Art</MenuItem>
                    <MenuItem value="photography">Photography</MenuItem>
                </Select>

                <FormControl sx={{ mt: 2, maxWidth: 120 }}>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Submit
                        <VisuallyHiddenInput type="file" accept='image/*' />
                    </Button>

                </FormControl>
            </Box>
        </Container>
    );
}