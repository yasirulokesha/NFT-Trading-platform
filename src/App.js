import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from './Pages/Profile';
import Landing from './Pages/Landing';
import AssestOverView from './Pages/AssestOverview';

import Sample from './Assests/AssestPhotoSample.jpg'
import Login from './Pages/Login';

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
          <Route path='/profile/feed' element={<Profile />}></Route>
          <Route path='/profile/activity' element={<Profile />}></Route>
        </Route>
        <Route path='/artsample' element={<AssestOverView src={Sample} name="Art123" own="#User123" type="gaming" price="0.00456ETH" />} />
        <Route exact path='/login' element={<Login/>}></Route>
      </Routes>
    </Router>

  );
}

