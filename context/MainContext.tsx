'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type MainProviderType = {
  children: ReactNode;
};

type MainContextType = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};

const MainInitialValues: MainContextType = {
  showSidebar: false,
  setShowSidebar: () => {},
};

export const MainContext = createContext<MainContextType>(MainInitialValues);

export default function MainProvider({ children }: MainProviderType) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
