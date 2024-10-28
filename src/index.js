import React from 'react';
import ReactDOM from 'react-dom/client';
// import $ from 'jquery'; jQuery 必须在 Bootstrap 之前引入
// bootstrap
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/stylesheets/all.SCSS';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.js'

// css
import "./assets/stylesheets/css/plugins.css"
import "./assets/stylesheets/css/shortcode/shortcodes.css"
import "./assets/stylesheets/css/style.css"
import "./assets/stylesheets/css/responsive.css"
import "./assets/stylesheets/css/custom.css"

import "./assets/stylesheets/style.css"

import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';

// 預設API 網址
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  </React.StrictMode>
  /*<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
