// index.js
import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Make sure to import persistor
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let container = document.getElementById('root');

const root = createRoot(container);

let persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
