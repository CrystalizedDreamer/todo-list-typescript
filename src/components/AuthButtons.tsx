import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }

  return (
    <>
    <div className="d-flex align-items-center justify-content-between" id="WelcomeBanner">
      <p>Welcome, {user?.name}</p>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
    </div>
    </>
  );
};

export default AuthButtons;
