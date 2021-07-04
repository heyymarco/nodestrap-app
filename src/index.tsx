import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './apps/App';
import CheckApp from './apps/CheckApp';
import CardApp from './apps/CardApp';
import ModalApp from './apps/ModalApp';
import FormApp from './apps/FormApp';
import NavbarApp from './apps/NavbarApp';


import BasicComponentApp                    from './apps/BasicComponentApp';
    import ContainerApp                     from './apps/ContainerApp';
    import IndicatorApp                     from './apps/IndicatorApp';
        import ContentApp                   from './apps/ContentApp';
            import ListgroupApp             from './apps/ListgroupApp';
                import AccordionApp         from './apps/AccordionApp';
                import NavscrollApp         from './apps/NavscrollApp';
        import PopupApp                     from './apps/PopupApp';
            import AlertApp                 from './apps/AlertApp';
        import ControlApp                   from './apps/ControlApp';
            import ActionControlApp         from './apps/ActionControlApp';
                import ButtonApp            from './apps/ButtonApp';
                    import ButtonIconApp    from './apps/ButtonIconApp';
    import IconApp                          from './apps/IconApp';
    import MasonryApp                       from './apps/MasonryApp';
    import CarouselApp                      from './apps/CarouselApp';
    




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
