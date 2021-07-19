import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import { Provider } from 'react-redux';

import { store } from './Helpers';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    rootElement
);
