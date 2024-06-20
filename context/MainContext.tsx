'use client';
import { shortenString } from '@/helpers';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

type MainProviderType = {
  children: ReactNode;
};

export type UserOverviewType = {
  organization: string;
  username: string;
  phoneNumber: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  name: {
    first: string;
    last: string;
  };
  balance: string;
  profilePicture: string;
  rating: '1' | '2' | '3';
  dateJoined: Date | string;
  bank:
    | 'First Bank'
    | 'Access Bank'
    | 'GTB'
    | 'Zenith Bank'
    | 'UBA'
    | 'Wema Bank';
  bankAccount: string;
  fullName: string;
  id: string;
};

export type UserDataType = {
  title: string;
  data: {
    title: string;
    value:
      | string
      | {
          name: {
            first: string;
            last: string;
          };
        };
  }[];
};

export type UserType = {
  overview: UserOverviewType;
  data: UserDataType[];
};

type MainContextType = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setFetchingUsers: Dispatch<SetStateAction<boolean>>;
  users: UserType[] | null;
  setUsers: Dispatch<SetStateAction<UserType[] | null>>;
  fetchingUsers: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  organizations: string[];
};

const MainInitialValues: MainContextType = {
  showSidebar: false,
  setShowSidebar: () => {},
  users: null,
  fetchingUsers: false,
  setFetchingUsers: () => {},
  search: '',
  setSearch: () => {},
  setUsers: () => {},
  searchValue: '',
  setSearchValue: () => {},
  organizations: [],
};

export const MainContext = createContext<MainContextType>(MainInitialValues);

export default function MainProvider({ children }: MainProviderType) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [organizations, setOrganizations] = useState<string[]>([]);

  useEffect(() => {
    if (users)
      setOrganizations(
        users.map((user) => shortenString(user.overview.organization)),
      );
  }, [users]);

  return (
    <MainContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        users,
        setUsers,
        fetchingUsers,
        search,
        setSearch,
        organizations,
        searchValue,
        setSearchValue,
        setFetchingUsers,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
