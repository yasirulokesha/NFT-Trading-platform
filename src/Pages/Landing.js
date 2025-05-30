import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { SubLink, Assest, CustomLink } from '../Components/Components';

import {
  Route,
  Routes
} from "react-router-dom";

import axios from 'axios'

import Sample1 from '../Assests/NFTs/NFT00001.jpg'
import Sample2 from '../Assests/NFTs/NFT00002.jpg'
import Sample3 from '../Assests/NFTs/NFT00003.jpg'
import Sample4 from '../Assests/NFTs/NFT00004.jpg'
import Sample5 from '../Assests/NFTs/NFT00005.jpg'
import Sample6 from '../Assests/NFTs/NFT00006.jpg'
import Sample7 from '../Assests/NFTs/NFT00007.jpg'
import Sample8 from '../Assests/NFTs/NFT00008.jpg'
import Sample9 from '../Assests/NFTs/NFT00009.jpg'
import Sample10 from '../Assests/NFTs/NFT00010.jpg'
import Sample11 from '../Assests/NFTs/NFT00011.jpg'
import Sample12 from '../Assests/NFTs/NFT00012.jpg'

// Create data set for the NFTs
function createData(category, src, name, price) {
  return { category, src, name, price };
}

// NFT data array
export const Assests = [
  createData('gaming', Sample1, 'Monkey Dory', '0.121ETH'),
  createData('art', Sample2, 'Angry Monkey', '0.156ETH'),
  createData('photography', Sample3, 'Gentle gamer', '0.237ETH'),
  createData('art', Sample4, 'Funky dirt', '0.456ETH'),
  createData('art', Sample5, 'Hounerable', '0.135ETH'),
  createData('gaming', Sample6, 'Thug Life', '0.232ETH'),
  createData('photography', Sample7, 'Rapper', '0.110ETH'),
  createData('art', Sample8, 'Super Joke', '0.311ETH'),
  createData('gaming', Sample9, 'AirSky Joker', '0.745ETH'),
  createData('art', Sample10, 'Stylish gamer', '0.568ETH'),
  createData('photography', Sample11, 'Sun Flower', '0.698ETH'),
  createData('gaming', Sample12, 'Mixed Colours', '0.124ETH'),
]

// Export the Landing page
export default function Landing() {
  return (
    <Container fixed>
      <Typography m="10px" variant='h5'>Explore</Typography>
      {/* Create routes for filtering purposes */}
      <Routes>
        <Route index element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink active={true} to="/" placeholder="All" />
              <SubLink to="/future" placeholder="Future" />
              <SubLink to="/gaming" placeholder="Gaming" />
              <SubLink to="/art" placeholder="Art" />
              <SubLink to="/photography" placeholder="Photography" />
            </Stack>
            <All />
          </div>
        } >
        </Route>
        <Route exact path='/future' element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink to="/#" placeholder="All" />
              <SubLink active={true} to="/future" placeholder="Future" />
              <SubLink to="/gaming" placeholder="Gaming" />
              <SubLink to="/art" placeholder="Art" />
              <SubLink to="/photography" placeholder="Photography" />
            </Stack>
            <Future />
          </div>
        } />
        <Route exact path='/gaming' element={
          <div>
            <Stack flexWrap="wrap" direction="row" mb="10px">
              <SubLink to="/#" placeholder="All" />
              <SubLink to="/future" placeholder="Future" />
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
              <SubLink to="/future" placeholder="Future" />
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
              <SubLink to="/future" placeholder="Future" />
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

// Export the all NFT assests into the gallery
export function All() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
      .then((response) => {
        setData(response.data)
      })
      .catch(
        (error) => {
          console.log("Error fetching data")
        }
      )
  }, [])

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      {data.map((asset, index) => (
        <CustomLink key={index} element={<Assest src={asset['asset']} name={asset['name']} price={asset['price']} />} to={`/` + asset["id"]} />
      ))}
    </Stack>
  )
}

// Export the gaming NFTs for the gallery
export function Gaming() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.
      get('http://127.0.0.1:8000/gaming')
      .then((response) => {
        setData(response.data)
      })
  }, [])

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      {data.map((asset, index) => (
        <CustomLink key={index} element={<Assest src={asset['asset']} name={asset['name']} price={asset['price']} />} to={`/` + asset["id"]} />
      ))}
    </Stack>
  )
}

// Export the art NFTs for the gallery
export function Art() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.
      get('http://127.0.0.1:8000/art')
      .then((response) => {
        setData(response.data)
      })
  }, [])

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      {Array.isArray(data) ? (
          data.map((asset, index) => (
            <CustomLink key={index} element={<Assest src={asset['asset']} name={asset['name']} price={asset['price']} />} to={`/` + asset["id"]} />
          ))
      ) : (
        <Typography>Loading...</Typography>
      )}

    </Stack>
  )
}

// Export the photography NFTs for the gallery
export function Photography() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.
      get('http://127.0.0.1:8000/photography')
      .then((response) => {
        setData(response.data)
      })
  }, [])

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      {Array.isArray(data) ? (
          data.map((asset, index) => (
            <CustomLink key={index} element={<Assest src={asset['asset']} name={asset['name']} price={asset['price']} />} to={`/` + asset["id"]} />
          ))
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Stack>
  )
}

// Export the Future NFTs for the gallery
export function Future() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.
      get('http://127.0.0.1:8000/future')
      .then((response) => {
        setData(response.data)
      })
  }, [])

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
      {Array.isArray(data) ? (
          data.map((asset, index) => (
            <CustomLink key={index} element={<Assest src={asset['asset']} name={asset['name']} price={asset['price']} />} to={`/` + asset["id"]} />
          ))
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Stack>
  )
}