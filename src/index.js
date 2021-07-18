import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "react-redux"
import { configureStore } from "./store/configureStore"
import { saveState } from "./localStorage";

import { throttle } from "lodash/throttle";

const store = configureStore();
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

ReactDOM.render(<Provider store={store}><BrowserRouter><ToastProvider><App /></ToastProvider></BrowserRouter></Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
