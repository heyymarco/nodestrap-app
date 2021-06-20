import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './apps/App';
import CheckApp from './apps/CheckApp';
import ListgroupApp from './apps/ListgroupApp';
import CardApp from './apps/CardApp';
import ModalApp from './apps/ModalApp';
import FormApp from './apps/FormApp';
import NavbarApp from './apps/NavbarApp';
import CarouselApp from './apps/CarouselApp';
import NavscrollApp from './apps/NavscrollApp';
import AccordionApp from './apps/AccordionApp';
import IconApp from './apps/IconApp';

import BasicComponentApp    from './apps/BasicComponentApp';
import IndicatorApp         from './apps/IndicatorApp';
import PopupApp             from './apps/PopupApp';
import AlertApp             from './apps/AlertApp';
import ContentApp           from './apps/ContentApp';
import MasonryApp           from './apps/MasonryApp';
import ContainerApp         from './apps/ContainerApp';



ReactDOM.render(
    <React.StrictMode>
        <ContainerApp />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
