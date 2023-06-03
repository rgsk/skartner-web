// context/GlobalContext.tsx

import { LocalStorageKeys } from 'constants/globalConstants';
import { UsersForLoginPageQuery, useUsersForLoginPageQuery } from 'gql/graphql';
import useLocalStorageState from 'hooks/utils/useLocalStorageState';
import useRunOnWindowFocus from 'hooks/utils/useRunOnWindowFocus';
import globalProps from 'lib/globalProps';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const usePathsVisitedTracker = () => {
  const router = useRouter();

  const [pathsVisited, setPathsVisited] = useState<string[]>([]);

  useEffect(() => {
    setPathsVisited((prev) => [...prev, router.asPath]);
  }, [router.asPath]);

  useEffect(() => {
    globalProps.pathsVisited = pathsVisited;
  }, [pathsVisited]);

  return { pathsVisited };
};

const useGlobalContextValue = () => {
  const [user, setUser, userStatePopulated] = useLocalStorageState<
    UsersForLoginPageQuery['users'][number]
  >(LocalStorageKeys.user, null);

  const usersForLoginPageQueryResult = useUsersForLoginPageQuery({
    variables: {
      where: { email: { equals: user?.email } },
    },
    skip: !user?.email,
    onCompleted: ({ users }) => {
      if (users && users.length > 0) {
        setUser(users[0]);
      }
    },
  });

  useRunOnWindowFocus(usersForLoginPageQueryResult.refetch);

  const { pathsVisited } = usePathsVisitedTracker();

  return {
    user,
    setUser,
    userStatePopulated,
    pathsVisited,
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
