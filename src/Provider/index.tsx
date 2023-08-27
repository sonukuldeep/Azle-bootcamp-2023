import AuthContextProvider from './AuthContextProvider';
import UserContextProvider from './ContextProvider';

import React, { ReactNode } from 'react';

function Provider({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </AuthContextProvider>
  );
}

export default Provider;
