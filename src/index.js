import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider i18n={en}>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();