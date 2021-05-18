import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import CheckApp from './CheckApp';
import ListGroupApp from './ListGroupApp';
import CardApp from './CardApp';
import ModalApp from './ModalApp';
import FormApp from './FormApp';
import NavbarApp from './NavbarApp';
import CarouselApp from './CarouselApp';
import NavscrollApp from './NavscrollApp';

ReactDOM.render(
  <React.StrictMode>
    <NavscrollApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
