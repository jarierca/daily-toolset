import App from './App';
import React from 'react';
import Store from './redux/Store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter basename="/daily-toolset">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
