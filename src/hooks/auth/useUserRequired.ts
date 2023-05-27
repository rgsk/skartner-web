import { useGlobalContext } from 'context/GlobalContext';
import { addParamsToPath } from 'lib/queryParamsUtils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const RedirectUrlQueryParam = 'redirect-url';

const useUserRequired = () => {
  const { user, userStatePopulated } = useGlobalContext();
  const router = useRouter();

  const userPresent = useMemo(() => {
    return !!user;
  }, [user]);

  useEffect(() => {
    if (!userStatePopulated) return;
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
  }, [userStatePopulated, router, userPresent]);
  return userPresent;
};
export default useUserRequired;
