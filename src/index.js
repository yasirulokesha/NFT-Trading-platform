import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Header } from './Components/Header';
import './style.css'
import { Devtag } from './Components/Components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <App />
    <Devtag/>
  </React.StrictMode>
);

reportWebVitals();
