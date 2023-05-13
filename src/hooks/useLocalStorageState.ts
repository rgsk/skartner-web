import { useCallback, useState } from 'react';
import useStateRef from './useStateRef';

// Hook
const useLocalStorageState = <T>(key: string, initialValue: T) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const storedValueRef = useStateRef(storedValue);
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (valueOrFunction: T | ((arg0: T) => T)) => {
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
  return [storedValue, setValue] as const;
};

export default useLocalStorageState;
