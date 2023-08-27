import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Sample from './Assests/AssestPhotoSample.jpg'

import { CustomLink, Assest } from './Components/Components';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Container fixed>
      <Typography m="10px" variant='h5'>Explore</Typography>
      <Router>
        <Routes>
          <Route index element={
            <div>
              <Stack direction="row" mb="10px">
                <CustomLink active={true} to="/#" placeholder="All" />
                <CustomLink to="/gaming" placeholder="Gaming" />
                <CustomLink to="/art" placeholder="Art" />
                <CustomLink to="/photography" placeholder="Photography" />
              </Stack>
              <All />
            </div>
          } >
          </Route>
          <Route path='/gaming' element={
            <div>
              <Stack direction="row" mb="10px">
                <CustomLink to="/#" placeholder="All" />
                <CustomLink active={true} to="/gaming" placeholder="Gaming" />
                <CustomLink to="/art" placeholder="Art" />
                <CustomLink to="/photography" placeholder="Photography" />
              </Stack>
              <Gaming />
            </div>
          } />
          <Route path='/art' element={
            <div>
              <Stack direction="row" mb="10px">
                <CustomLink to="/#" placeholder="All" />
                <CustomLink to="/gaming" placeholder="Gaming" />
                <CustomLink active={true} to="/art" placeholder="Art" />
                <CustomLink to="/photography" placeholder="Photography" />
              </Stack>
              <Art />
            </div>
          } />
          <Route path='/photography' element={
            <div>
              <Stack direction="row" mb="10px">
                <CustomLink to="/#" placeholder="All" />
                <CustomLink to="/gaming" placeholder="Gaming" />
                <CustomLink to="/art" placeholder="Art" />
                <CustomLink active={true} to="/photography" placeholder="Photography" />
              </Stack>
              <Photography />
            </div>
          } />

        </Routes>
      </Router>
    </Container>
  );
}

export default App;

function All() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}

function Gaming() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}

function Art() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}

function Photography() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}