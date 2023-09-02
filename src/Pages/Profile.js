import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import React from 'react'

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

import Sample from '../Assests/AssestPhotoSample.jpg'
import { Upload } from '@mui/icons-material';

import StartIcon from '@mui/icons-material/Start';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

const ProfilePhotoWrap = styled('img')(() => ({
    width: 150,
    height: 150,
    borderRadius: '100%',
    overflow: 'hidden',
    borderWidth: 7,
    borderColor: '#FFF',
    borderStyle: 'solid'
}))

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



export default function Profile() {

    return (
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
                    <Typography fontWeight={700} variant='h4'>Username</Typography>
                    <Typography fontWeight={500} variant='body1'>#11312331</Typography>
                </DetailsContainer>
            </Container>
            <Routes>
                <Route path='/' element={
                    <div>
                        <Stack flexWrap="wrap" direction="row" mb="10px">
                            <SubLink active={true} to="/profile/" placeholder="Wallet" />
                            <SubLink to="/profile/feed" placeholder="Collection" />
                            <SubLink to="/profile/activity" placeholder="Activity" />
                        </Stack>
                        <Wallet />
                    </div>
                } />
                <Route exact path='/feed' element={
                    <div>
                        <Stack flexWrap="wrap" direction="row" mb="10px">
                            <SubLink to="/profile/" placeholder="Wallet" />
                            <SubLink active={true} to="/profile/feed" placeholder="Collection" />
                            <SubLink to="/profile/activity" placeholder="Activity" />
                        </Stack>
                        <Feed />
                    </div>
                } />
                <Route exact path='/activity' element={
                    <div>
                        <Stack flexWrap="wrap" direction="row" mb="10px">
                            <SubLink to="/profile/" placeholder="Wallet" />
                            <SubLink to="/profile/feed" placeholder="Collection" />
                            <SubLink active={true} to="/profile/activity" placeholder="Activity" />
                        </Stack>
                        <Activity />
                    </div>
                } />
            </Routes>
        </Container >
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1a237e",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(cat, name, calories, fat, carbs, protein) {
    return { cat, name, calories, fat, carbs, protein };
}

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

const rows = [
    createData('in', 'Heroes of Parallel', 159, 6.0, 24, 4.0),
    createData('Winesed Elder', 237, 9.0, 37, 4.3),
    createData('Heroes of Parallel', 262, 16.0, 24, 6.0),
    createData('Test NFT ', 305, 3.7, 67, 4.3),
    createData('Heroes of Parallel', 356, 16.0, 49, 3.9),
];

export function Activity() {
    return (
        <div>
            <TableContainer sx={{ marginTop: 10, borderRadius: 3 }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Item</StyledTableCell>
                            <StyledTableCell align="right">Price&nbsp;(ETH)</StyledTableCell>
                            <StyledTableCell align="right">Qty</StyledTableCell>
                            <StyledTableCell align="right">From</StyledTableCell>
                            <StyledTableCell align="right">To</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" align='center'>
                                    <IconIndicate status={row.cat} />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export function Feed() {
    return (
        <div>
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
            }} variant="contained" endIcon={<Upload />}>
                Upload Assest
            </Button>
            <Stack flexWrap='wrap' flexDirection='row'>
                <CustomLink element={<Assest src={Sample} name="Art" price="0.0001ETH" />} to="/artsample" />
                <CustomLink element={<Assest src={Sample} name="Art" price="0.0001ETH" />} to="/artsample" />
                <CustomLink element={<Assest src={Sample} name="Art" price="0.0001ETH" />} to="/artsample" />
                <CustomLink element={<Assest src={Sample} name="Art" price="0.0001ETH" />} to="/artsample" />
            </Stack>
        </div>
    )
}
export function Wallet() {
    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 5
        }} fixed>
            <WalletPreview wallet="#11312331" balance="0.11111" />
        </Container>
    )
}