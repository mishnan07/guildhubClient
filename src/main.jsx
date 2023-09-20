// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store.js'; 
import { PersistGate } from 'redux-persist/integration/react';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='71821050732-uskp1metr36vvudlb8cb0jvrt47fnigb.apps.googleusercontent.com'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> {/* Add PersistGate */}
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
