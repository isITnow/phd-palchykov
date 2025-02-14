import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import queryClient from './queryClient.js';
import UserContextProvider from './context/UserContext.js';

import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
