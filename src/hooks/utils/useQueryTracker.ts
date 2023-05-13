import { updateParamsForPath } from 'lib/queryParamsUtils';
import Router, { useRouter } from 'next/router';

import { useEffect, useRef } from 'react';
const useQueryTracker = (
  input: Record<string, any>,
  cb: ({
    params,
    onParamsAssignedToState,
  }: {
    params: Record<string, string | string[] | undefined>;
    onParamsAssignedToState: () => void;
  }) => void
) => {
  const router = useRouter();
  const paramsAssignedToStateRef = useRef(false);
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!router.isReady) return;
    if (!paramsAssignedToStateRef.current) {
      cbRef.current({
        params: router.query,
        onParamsAssignedToState: () => {
          paramsAssignedToStateRef.current = true;
        },
      });
    }
  }, [router.isReady, router.query]);
  useEffect(() => {
    if (paramsAssignedToStateRef.current) {
      // here Router is used instead of Router,
      // because we didn't wanted to provide router
      // as a useEffect depedency and run on every router.query change
      Router.push(updateParamsForPath(Router.asPath, input));
    }
  }, [input]);

  return null;
};
export default useQueryTracker;
