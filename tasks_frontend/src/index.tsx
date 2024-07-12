import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";


console.log(process.env)
console.log(process.env.REACT_APP_PUBLIC_URL)
console.log(process.env.PUBLIC_URL)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);


reportWebVitals();
