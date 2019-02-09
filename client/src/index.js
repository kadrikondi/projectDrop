import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import './components/assets/mdb/css/bootstrap.min.css'
import './components/assets/mdb/css/mdb.min.css'
import './components/assets/mdb/css/style.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
// import mbdreact from 'mdreact'


const app = (

    <BrowserRouter>
        <App />
    </BrowserRouter>

);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
