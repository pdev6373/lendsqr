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
  users: UserType[] | null;
  fetchingUsers: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  organizations: string[];
};

const MainInitialValues: MainContextType = {
  showSidebar: false,
  setShowSidebar: () => {},
  users: null,
  fetchingUsers: false,
  search: '',
  setSearch: () => {},
  organizations: [],
};

export const MainContext = createContext<MainContextType>(MainInitialValues);

export default function MainProvider({ children }: MainProviderType) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [search, setSearch] = useState('');
  const [organizations, setOrganizations] = useState<string[]>([]);

  useEffect(() => {
    try {
      setFetchingUsers(true);
      fetch('https://demo1391722.mockable.io/users', { method: 'GET' })
        .then((response) => response.json())
        .then((json) => {
          setUsers(json);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setFetchingUsers(false);
    }
  }, []);

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
        fetchingUsers,
        search,
        setSearch,
        organizations,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
