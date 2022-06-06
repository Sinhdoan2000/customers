import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider i18n={en}>
      <App />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();