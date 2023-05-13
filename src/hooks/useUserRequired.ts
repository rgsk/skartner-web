import { useGlobalContext } from 'context/GlobalContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const RedirectUrlQueryParam = 'redirect-url';

const useUserRequired = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (user && localStorage.getItem('user')) {
      return;
    }
    const returnUrl = router.asPath;
    // we use router.replace instead of router.push
    // this allows user to come back, at previous page
    // when clicking back
    router.replace(`/login?${RedirectUrlQueryParam}=` + returnUrl);
  }, [router, user]);
};
export default useUserRequired;
