// context/GlobalContext.tsx

import { LocalStorageKeys } from 'constants/globalConstants';
import { UsersForLoginPageQuery, useMetaFieldsQuery } from 'gql/graphql';
import useLocalStorageState from 'hooks/utils/useLocalStorageState';
import { createContext, useContext, useMemo } from 'react';

const useGlobalContextValue = () => {
  const [user, setUser, userStatePopulated] = useLocalStorageState<
    UsersForLoginPageQuery['users'][number]
  >(LocalStorageKeys.user, null);

  const { data: { metaFields } = {} } = useMetaFieldsQuery();

  const userParsedMeta = useMemo(() => {
    if (user && metaFields) {
      const jsonParsedMeta = JSON.parse(user.meta);
      return {
        [metaFields.user
          .showDefaultGreWordSearchPromptInputs as 'showDefaultGreWordSearchPromptInputs']:
          jsonParsedMeta[
            metaFields.user.showDefaultGreWordSearchPromptInputs
          ] as undefined | null | boolean,
        [metaFields.user
          .defaultGreWordSearchPromptInput as 'defaultGreWordSearchPromptInput']:
          jsonParsedMeta[metaFields.user.defaultGreWordSearchPromptInput] as
            | undefined
            | null
            | string,
      };
    }
  }, [metaFields, user]);

  return {
    user,
    userParsedMeta,
    setUser,
    metaFields,
    userStatePopulated,
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
