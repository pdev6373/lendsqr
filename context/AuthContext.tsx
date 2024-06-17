'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

const initialSetFunction = () => {};

type AuthProviderType = {
  children: ReactNode;
};

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthInitialValues: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: initialSetFunction,
};

export const AuthContext = createContext<AuthContextType>(AuthInitialValues);

export default function AuthProvider({ children }: AuthProviderType) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
