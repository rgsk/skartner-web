import { useGlobalContext } from 'context/GlobalContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const RedirectUrlQueryParam = 'redirect-url';

const useUserRequired = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    // localStorage.getItem('user') check is added so that
    // we can easily test non-loggedin user behaviours but removing user from localStorage
    if (user && localStorage.getItem('user')) {
      return;
    }
    const returnUrl = router.asPath;
    // we use router.replace instead of router.push
    // this allows user to come back, at previous page (on which userRequired was not necassary)
    // when clicking brower back button
    router.replace(`/login?${RedirectUrlQueryParam}=` + returnUrl);
  }, [router, user]);
};
export default useUserRequired;
