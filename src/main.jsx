import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import {FirebaseContext} from './store/Context.jsx';
import Context from './store/Context.jsx';
import {auth,firestore} from './firebase/config.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ auth, firestore }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </StrictMode>,
)
