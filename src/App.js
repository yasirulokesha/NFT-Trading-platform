import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from './Pages/Profile';
import Landing, { Assests } from './Pages/Landing';
import AssestOverView from './Pages/AssestOverview';

import Login from './Pages/Login';
import AddAccount from './Pages/CreateAccount';
import AssestUpload from './Components/UploadForm';
import axios from 'axios';
import { useState } from 'react';


export default function App() {
  const [Data, setData] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/details/')
      .then((response) => {
        setData(response.data)
      }).catch(
        (error) => {
          console.log("Error", error);
        }
      )
  }, [])
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />}>
          <Route path='/gaming' element={<Landing />} />
          <Route path='/future' element={<Landing />} />
          <Route path='/art' element={<Landing />} />
          <Route path='/photography' element={<Landing />} />
        </Route>
        <Route exact path='/profile' element={<Profile />} >
          <Route path='/profile/wallet' element={<Profile />}></Route>
          <Route path='/profile/activity' element={<Profile />}></Route>
        </Route>
        {Data.map((assest, index) => (
          <Route key={index} path={`${assest.id}`} element={<AssestOverView src={assest.asset} name={assest.name} own={assest.owner} type={assest.category} price={assest.price} />} />
        ))}
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/upload' element={<AssestUpload />}></Route>
        <Route exact path='/register' element={<AddAccount />} />
      </Routes>
    </Router>

  );
}

