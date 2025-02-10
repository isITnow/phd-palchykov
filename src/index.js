import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { Provider } from 'react-redux';
import { persister, store } from './redux/store';
import queryClient from './queryClient.js';

import App from './App';
import Loader from './components/shared/Loader';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persister}>
      <BrowserRouter>
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
