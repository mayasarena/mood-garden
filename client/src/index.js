import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './contexts/UserContext';
import { MoodEntriesProvider } from './contexts/MoodEntriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH}>
      <UserProvider>
        <MoodEntriesProvider>
          <App />
        </MoodEntriesProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
