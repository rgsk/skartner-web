import { useCallback, useState } from 'react';

const useRefresh = () => {
  const [value, setValue] = useState(false);
  const refresh = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return {
    refresh,
    refreshDep: value,
  };
};

export default useRefresh;
