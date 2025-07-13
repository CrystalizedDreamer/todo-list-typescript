import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodoProvider } from './context/TodoContext';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-z8ti82v2v20yudml.us.auth0.com"
      clientId="DgSIxlWTEpn0jMMSwLJ8rbGkfGtN3dQg"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <TodoProvider>
        <App />
      </TodoProvider>
    </Auth0Provider>
  </StrictMode>,
)
