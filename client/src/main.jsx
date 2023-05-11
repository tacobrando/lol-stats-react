import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000/"

axios.interceptors.request.use(request => {
  // Edit request config
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // Edit response config
  return response;
}, error => {
  return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);