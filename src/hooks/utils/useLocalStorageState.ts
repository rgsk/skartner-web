import { useCallback, useEffect, useState } from 'react';
import useRunOnWindowFocus from './useRunOnWindowFocus';
import useStateRef from './useStateRef';

// Hook
const useLocalStorageState = <T>(key: string, initialValue: T | null) => {
  type Z = T | null;
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(initialValue);

  const [statePopulated, setStatePopulated] = useState(false);

  const populateStateFromLocalStorage = useCallback(() => {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    setStoredValue(item === null ? item : JSON.parse(item));
    setStatePopulated(true);
  }, [key]);

  useEffect(() => {
    populateStateFromLocalStorage();
  }, [populateStateFromLocalStorage]);

  // below takes care of populating the state if user loggedin in another tab and
  // then when he comes back on this tab
  useRunOnWindowFocus(populateStateFromLocalStorage);

  const storedValueRef = useStateRef(storedValue);
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (valueOrFunction: Z | ((arg0: Z) => Z)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          valueOrFunction instanceof Function
            ? valueOrFunction(storedValueRef.current)
            : valueOrFunction;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key, storedValueRef]
  );
  return [storedValue, setValue, statePopulated] as const;
};

export default useLocalStorageState;
