import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Sample from '../Assests/AssestPhotoSample.jpg'

import { SubLink, Assest } from '../Components/Components';

import {
  Route,
  Routes
} from "react-router-dom";


export default function Landing() {
  return (
    <Container fixed>
      <Typography m="10px" variant='h5'>Explore</Typography>
      <Routes>
        <Route index element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink active={true} to="/" placeholder="All" />
              <SubLink to="/gaming" placeholder="Gaming" />
              <SubLink to="/art" placeholder="Art" />
              <SubLink to="/photography" placeholder="Photography" />
            </Stack>
            <All />
          </div>
        } >
        </Route>
        <Route exact path='/gaming' element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink to="/#" placeholder="All" />
              <SubLink active={true} to="/gaming" placeholder="Gaming" />
              <SubLink to="/art" placeholder="Art" />
              <SubLink to="/photography" placeholder="Photography" />
            </Stack>
            <Gaming />
          </div>
        } />
        <Route path='/art' element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink to="/#" placeholder="All" />
              <SubLink to="/gaming" placeholder="Gaming" />
              <SubLink active={true} to="/art" placeholder="Art" />
              <SubLink to="/photography" placeholder="Photography" />
            </Stack>
            <Art />
          </div>
        } />
        <Route path='/photography' element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink to="/#" placeholder="All" />
              <SubLink to="/gaming" placeholder="Gaming" />
              <SubLink to="/art" placeholder="Art" />
              <SubLink active={true} to="/photography" placeholder="Photography" />
            </Stack>
            <Photography />
          </div>
        } />
      </Routes>
    </Container>
  )
}

export function All() {
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

export function Gaming() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}

export function Art() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}

export function Photography() {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Stack>
  )
}