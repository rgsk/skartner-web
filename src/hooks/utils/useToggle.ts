import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const useToggle = (
  initialValue = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [value, toggle, setValue];
};
export default useToggle;
