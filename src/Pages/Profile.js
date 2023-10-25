import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

import {
    Route,
    Routes
} from "react-router-dom";

import ProfileImage from '../Assests/profile.png'
import { styled } from '@mui/material/styles';

import Cover from '../Assests/cover.jpg';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Assest, CustomLink, SubLink, WalletPreview } from '../Components/Components';

import { Upload } from '@mui/icons-material';

import StartIcon from '@mui/icons-material/Start';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

import Sample1 from '../Assests/NFTs/NFT00001.jpg'
import Sample2 from '../Assests/NFTs/NFT00002.jpg'
import Sample3 from '../Assests/NFTs/NFT00003.jpg'
import Sample8 from '../Assests/NFTs/NFT00008.jpg'
import Sample11 from '../Assests/NFTs/NFT00011.jpg'
import Sample12 from '../Assests/NFTs/NFT00012.jpg'

import { RequireToken } from '../Auth';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios'
import AssestUpload from '../Components/UploadForm';

// Create NFT data sets from array
function createNFTData(category, src, name, price) {
    return { category, src, name, price };
}
// NFT details array
const PrivateAssests = [
    createNFTData('gaming', Sample1, 'Monkey Dory', '0.121ETH'),
    createNFTData('art', Sample2, 'Angry Monkey', '0.156ETH'),
    createNFTData('photography', Sample3, 'Gentle gamer', '0.237ETH'),
    createNFTData('art', Sample8, 'Super Joke', '0.311ETH'),
    createNFTData('photography', Sample11, 'Sun Flower', '0.698ETH'),
    createNFTData('gaming', Sample12, 'Mixed Colours', '0.124ETH'),
]

// Profile photo wraping styles
const ProfilePhotoWrap = styled('img')(() => ({
    width: 150,
    height: 150,
    borderRadius: '100%',
    overflow: 'hidden',
    borderWidth: 7,
    borderColor: '#FFF',
    borderStyle: 'solid'
}))

// Cover photo wraping styles
const CustomizedPaper = styled(Paper)(({ theme }) => ({
    borderRadius: 15,
    height: 300,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        height: 150
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

// Details container styles
const DetailsContainer = styled(Container)(({ theme }) => ({
    marginTop: -60,
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        marginTop: 50
    }
}))

// Building the profile and export
export default function Profile() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [walletAddress, setwalletAddress] = useState('')
    const [balance, setBalance] = useState()
    const [Uploadhandle, setUploadhandle] = useState(false)
    const [Email, setEmail] = useState('')


    const signOut = () => {
        localStorage.removeItem("password_token");
        localStorage.removeItem("username");
        navigate("/");
    };

    const OpenUploadDialog = () => {
        setUploadhandle(true)
    }

    const CloseUploadDialog = () => {
        setUploadhandle(false)
    }
    useEffect(() => {
        axios
            .post("http://127.0.0.1:8000/profile", {
                username: localStorage.getItem("username")
            })
            .then((response) => {
                if (response.data) {
                    // Set details from database
                    setUsername(response.data.username)
                    setwalletAddress(response.data.wallet)
                    setBalance(response.data.balance)
                    setEmail(response.data.email)
                }
            })
            .catch((error) => {
                console.log("error")
            });
    }, [])

    return (
        <RequireToken>
            <Dialog
                fullWidth='true'
                maxWidth='md'
                open={Uploadhandle}
                onClose={CloseUploadDialog}
                scroll='body'
            >
                <DialogTitle>Upload Your NFT Here</DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    maxWidth: '500px'
                }} >
                    <AssestUpload />
                </DialogContent>
                <DialogActions>
                    <Button onClick={CloseUploadDialog}>Close</Button>
                </DialogActions>
            </Dialog>
            <Container fixed>
                <CustomizedPaper elevation="24">
                    <img src={Cover} width='100%' alt='Cover' />
                </CustomizedPaper>
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }} fixed >
                    <DetailsContainer>
                        <ProfilePhotoWrap src={ProfileImage} alt='Prifile picture' />
                        <Typography fontWeight={700} variant='h4'>{username}</Typography>
                        <Typography fontWeight={500} variant='body1'>{Email}</Typography>
                        <Button fontWeight={700} sx={{
                            backgroundColor: '#ff4848',
                            borderRadius: 1,
                            textTransform: 'none',
                            fontSize: 15,
                            marginTop: 2,
                            marginBottom: 2,
                            '&: hover': {
                                backgroundColor: '#9d0000'
                            }
                        }} variant="contained" onClick={signOut} >
                            Sign Out
                        </Button>
                    </DetailsContainer>
                </Container>
                <Button onClick={OpenUploadDialog} fontWeight={700} sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    marginTop: 3,
                    marginBottom: 3
                }} variant="contained" endIcon={<Upload />}>
                    Upload Assest
                </Button>
                <Routes>
                    <Route path='/' element={
                        <div>
                            <Stack flexWrap="wrap" direction="row" mb="10px">
                                <SubLink active={true} to="/profile/" placeholder="Feed" />
                                <SubLink to="/profile/wallet" placeholder="Wallet" />
                                <SubLink to="/profile/activity" placeholder="Activity" />
                            </Stack>
                            <Feed />
                        </div>
                    } />
                    <Route exact path='/wallet' element={
                        <div>
                            <Stack flexWrap="wrap" direction="row" mb="10px">
                                <SubLink to="/profile/" placeholder="Feed" />
                                <SubLink active={true} to="/profile/wallet" placeholder="Wallet" />
                                <SubLink to="/profile/activity" placeholder="Activity" />
                            </Stack>
                            <Wallet address={walletAddress} balance={balance} />
                        </div>
                    } />
                    <Route exact path='/activity' element={
                        <div>
                            <Stack flexWrap="wrap" direction="row" mb="10px">
                                <SubLink to="/profile/" placeholder="Feed" />
                                <SubLink to="/profile/wallet" placeholder="Wallet" />
                                <SubLink active={true} to="/profile/activity" placeholder="Activity" />
                            </Stack>
                            <Activity />
                        </div>
                    } />
                </Routes>
            </Container >
        </RequireToken>
    )
}

// Styling a cell of table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1a237e",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

// Styling a row of table
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Create data set for activity table
function createData(cat, name, price, qty, from, to) {
    return { cat, name, price, qty, from, to };
}

// Icon usage for indicate the Incoming and Outgoing transactions
function IconIndicate(props) {
    if (props.status === 'in') {
        return (
            <StartIcon />
        )
    } else {
        return (
            <VerticalAlignTopIcon />
        )
    }
}

// Data array for the activity table
const rows = [
    createData('in', 'Monkey Dory', '0.121ETH', 1, '#13121', '#13124'),
    createData('out', 'Angry Monkey', '0.156ETH', 2, '#13124', '#13120'),
    createData('in', 'Gentle gamer', '0.237ETH', 5, '#13123', '#13124'),
    createData('in', 'Funky dirt ', '0.456ETH', 10, '#13127', '#13124'),
    createData('out', 'Hounerable', '0.212ETH', 3.0, '#13124', '#13121'),
];

// Building & exporting the Activity Table
export function Activity() {
    const [data, setData] = useState([])
    const username = localStorage.getItem("username")

    useEffect(() => {
        axios.
            post(`http://127.0.0.1:8000/activity/?user=${username}`)
            .then((response) => {
                setData(response.data)
            })
    }, [])

    return (
        <div>
            <TableContainer sx={{ marginTop: 10, borderRadius: 3 }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Item</StyledTableCell>
                            <StyledTableCell align="right">Price&nbsp;(ETH)</StyledTableCell>
                            <StyledTableCell align="right">From</StyledTableCell>
                            <StyledTableCell align="right">To</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.asset_name}>
                                <StyledTableCell component="th" align='center'>
                                    <IconIndicate status={row.cat} />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.asset_name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell align="right">{row.from}</StyledTableCell>
                                <StyledTableCell align="right">{row.to}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

// Export the NFTs gallery
export function Feed() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.
            get('http://127.0.0.1:8000/profile/feed/' + localStorage.getItem("username"))
            .then((response) => {
                setData(response.data)
            })
    }, [])

    return (
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
            {data.map((asset) => (
                <CustomLink element={<Assest src={asset['asset']} name={asset['name']} price={asset['price']} />} to={`/` + asset["id"]} />
            ))}
        </Stack>
    )
}

// Export the Wallet of the profile
export function Wallet(props) {
    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 5
        }} fixed>
            <WalletPreview wallet={props.address} balance={props.balance} />
        </Container>
    )
}