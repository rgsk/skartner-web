// context/GlobalContext.tsx

import { LocalStorageKeys } from 'constants/globalConstants';
import { UsersForLoginPageQuery } from 'gql/graphql';
import useLocalStorageState from 'hooks/useLocalStorageState';
import { createContext, useContext } from 'react';

const useGlobalContextValue = () => {
  const [user, setUser] = useLocalStorageState<
    UsersForLoginPageQuery['users'][number] | undefined | null
  >(LocalStorageKeys.user, undefined);
  return {
    user,
    setUser,
  };
};

const GlobalContext = createContext<ReturnType<
  typeof useGlobalContextValue
> | null>(null);

export const useGlobalContext = () => {
  const value = useContext(GlobalContext)!;
  return value;
};
interface IGlobalContextProviderProps {
  children: any;
}
export const GlobalContextProvider: React.FC<IGlobalContextProviderProps> = ({
  children,
}) => {
  const value = useGlobalContextValue();
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
