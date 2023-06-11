// context/GlobalContext.tsx

import { LocalStorageKeys } from 'constants/globalConstants';
import { UserQuery, useUserQuery } from 'gql/graphql';
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
    UserQuery['user']
  >(LocalStorageKeys.user, null);

  const userQueryResult = useUserQuery({
    variables: {
      where: { email: user?.email },
    },
    skip: !user?.email,
    onCompleted: ({ user }) => {
      if (user) {
        setUser(user);
      }
    },
  });

  useRunOnWindowFocus(() => {
    if (user?.email) {
      userQueryResult.refetch();
    }
  });

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
