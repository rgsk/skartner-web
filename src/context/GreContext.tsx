// context/GreContext.tsx

import { useGreConfigurationQuery } from 'gql/graphql';
import { createContext, useContext } from 'react';

const useGreContextValue = () => {
  const { data: { greConfiguration } = {} } = useGreConfigurationQuery();

  return { greConfiguration };
};

const GreContext = createContext<ReturnType<typeof useGreContextValue> | null>(
  null
);

export const useGreContext = () => {
  const value = useContext(GreContext)!;
  return value;
};
interface IGreContextProviderProps {
  children: any;
}
export const GreContextProvider: React.FC<IGreContextProviderProps> = ({
  children,
}) => {
  const value = useGreContextValue();
  return <GreContext.Provider value={value}>{children}</GreContext.Provider>;
};
