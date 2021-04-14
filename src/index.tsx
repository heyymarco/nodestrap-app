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

ReactDOM.render(
  <React.StrictMode>
    <CheckApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
