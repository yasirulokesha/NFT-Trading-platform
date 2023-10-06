import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from './Pages/Profile';
import Landing, { Assests } from './Pages/Landing';
import AssestOverView from './Pages/AssestOverview';

import Login from './Pages/Login';
import NFT from './nftdata';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />}>
          <Route exact path='/gaming' element={<Landing />} />
          <Route path='/art' element={<Landing />} />
          <Route path='/photography' element={<Landing />} />
        </Route>
        <Route exact path='/profile' element={<Profile />} >
          <Route path='/profile/wallet' element={<Profile />}></Route>
          <Route path='/profile/activity' element={<Profile />}></Route>
        </Route>
        {Assests.map((assest) => (
          <Route path={assest.name} element={<AssestOverView src={assest.src} name={assest.name} own="#User123" type={assest.category} price={assest.price} />} />
        ))}
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/nftdata' element={<NFT />}></Route>
      </Routes>
    </Router>

  );
}

