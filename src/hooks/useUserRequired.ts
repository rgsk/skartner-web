import { LocalStorageKeys } from 'constants/globalConstants';
import { useGlobalContext } from 'context/GlobalContext';
import { addParamsToPath } from 'lib/queryParamsUtils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const RedirectUrlQueryParam = 'redirect-url';

const useUserRequired = () => {
  const { user } = useGlobalContext();
  const router = useRouter();

  const userPresent = useMemo(() => {
    // localStorage.getItem(LocalStorageKeys.user) check is added so that
    // we can easily test non-loggedin user behaviours but removing user from localStorage
    return !!(user && localStorage.getItem(LocalStorageKeys.user));
  }, [user]);

  useEffect(() => {
    if (!userPresent) {
      const returnUrl = router.asPath;
      // we use router.replace instead of router.push
      // this allows user to come back, at previous page (on which userRequired was not necassary)
      // when clicking brower back button
      const loginPageRedirectPath = addParamsToPath('/login', {
        [RedirectUrlQueryParam]: returnUrl,
      });
      router.replace(loginPageRedirectPath);
    }
  }, [router, userPresent]);
  return userPresent;
};
export default useUserRequired;
