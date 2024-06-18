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
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const AuthInitialValues: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: initialSetFunction,
  email: '',
  setEmail: initialSetFunction,
};

export const AuthContext = createContext<AuthContextType>(AuthInitialValues);

export default function AuthProvider({ children }: AuthProviderType) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
