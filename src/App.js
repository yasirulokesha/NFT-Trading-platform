import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from './Pages/Profile';
import Landing, { Art, Gaming, Photography } from './Pages/Landing';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />}>
          <Route exact path='/gaming' element={<Gaming />} />
          <Route path='/art' element={<Art />} />
          <Route path='/photography' element={<Photography />} />
        </Route>
        <Route exact path='/profile' element={<Profile />} >
        </Route>
      </Routes>
    </Router>

  );
}

