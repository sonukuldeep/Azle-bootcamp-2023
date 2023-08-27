import { Principal } from '@dfinity/principal';
import { createContext, ReactNode, useContext } from 'react';
import { useState } from 'react';

type UserProps = {
  username?: string;
  principal: Principal;
  shortPrincipal: string;
  avatar?: string;
  logggedIn: boolean;
  daoMember: boolean;
  score?: number;
};

type ContextProps = {
  userInfo: UserProps | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

const UserContext = createContext<ContextProps>({
  userInfo: null,
  setUserInfo: () => {},
});

export const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
