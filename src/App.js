import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import Sample from './Assests/AssestPhotoSample.jpg'

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { Assest, ProfilePic } from './Components';



function App() {
  return (
    <Container fixed>
      <h3>Explore</h3>
      <Assest src={Sample} name="Art name" price="0.0001ETH" />
    </Container>
  );
}

export default App;
