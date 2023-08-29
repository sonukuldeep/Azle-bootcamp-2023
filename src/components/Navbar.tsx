import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../Provider/AuthContextProvider';
import { useUserContext } from '../Provider/ContextProvider';
import { useEffect, useState } from 'react';
import authHelper from '../lib/authHelper';

function Navbar() {
  const { authClient, defaultOptions } = useAuthContext();
  const { setUserInfo } = useUserContext();
  const [loginText, setLoginText] = useState('Login');

  function handleLogin() {
    if (!authClient) return;
    if (loginText === 'Login')
      authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          const { principal } = authHelper(authClient);
          const shortPrincipal = principal.toString().slice(0, 5);
          setUserInfo({
            logggedIn: true,
            daoMember: false,
            principal,
            shortPrincipal,
          });
          setLoginText(shortPrincipal);
          console.log(principal.toText());
        },
        onError(error) {
          console.log('Error during login ' + error);
        },
      });
    else {
      authClient.logout();
      setLoginText('Login');
    }
  }

  useEffect(() => {
    if (authClient) {
      const { principal, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        const shortPrincipal = principal.toString().slice(0, 5);
        setLoginText(shortPrincipal);
        console.log(principal.toText());
      }
    }
  }, [authClient]);

  return (
    <nav>
      <header>
        <h1>Tiny game studio</h1>
      </header>
      <div className="spacer"></div>
      <div className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Game
        </NavLink>
        <NavLink
          to="dao"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          reloadDocument
        >
          DAO
        </NavLink>
        <NavLink
          to="members"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          reloadDocument
        >
          Dao Members
        </NavLink>
        <NavLink
          to="fosset"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          reloadDocument
        >
          Fosset
        </NavLink>
        <span className="login-btn" onClick={handleLogin}>
          {loginText}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
