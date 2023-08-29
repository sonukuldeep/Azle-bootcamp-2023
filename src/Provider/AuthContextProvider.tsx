import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';

type ContextProps = {
  authClient: AuthClient | null;
  defaultOptions: DefaultOptions;
};

const defaultOptions = {
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    // identityProvider: `http://localhost:4943?canisterId=be2us-64aaa-aaaaa-qaabq-cai#authorize`,
    identityProvider: 'https://identity.ic0.app/#authorize',
    // Maximum authorization expiration is 8 days
    maxTimeToLive: BigInt(10 * 60 * 1000 * 1000 * 1000), // 10min
  },
};

const AuthContext = createContext<ContextProps>({
  authClient: null,
  defaultOptions,
});

export const useAuthContext = () => useContext(AuthContext);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  useEffect(() => {
    const getAuthClient = async () => {
      try {
        const authClient = await AuthClient.create(
          defaultOptions.createOptions,
        );
        setAuthClient(authClient);
      } catch (error) {
        console.log('Error: ' + error);
      }
    };
    getAuthClient();
  }, []);

  return (
    <AuthContext.Provider value={{ authClient, defaultOptions }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
