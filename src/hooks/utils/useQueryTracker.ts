import { updateParamsForPath } from 'lib/queryParamsUtils';
import Router, { useRouter } from 'next/router';

import { useEffect, useRef } from 'react';
import useRefresh from './useRefresh';
const useQueryTracker = (
  input: Record<string, any>,
  cb: ({
    params,
    onParamsAssignedToState,
  }: {
    params: Record<string, string | string[] | undefined>;
    onParamsAssignedToState: (
      updateQueryParamsWithUpdatedState?: boolean
    ) => void;
  }) => void
) => {
  const router = useRouter();
  const paramsAssignedToStateRef = useRef(false);
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const { refresh, refreshDep } = useRefresh();
  useEffect(() => {
    if (!router.isReady) return;
    if (!paramsAssignedToStateRef.current) {
      cbRef.current({
        params: router.query,
        onParamsAssignedToState: (
          updateQueryParamsWithUpdatedState = false
        ) => {
          setTimeout(() => {
            paramsAssignedToStateRef.current = true;
            if (updateQueryParamsWithUpdatedState) {
              refresh();
            }
          });
        },
      });
    }
  }, [refresh, router.isReady, router.query]);

  useEffect(() => {
    if (paramsAssignedToStateRef.current) {
      // here Router is used instead of Router,
      // because we didn't wanted to provide router
      // as a useEffect depedency and run on every router.query change
      Router.push(updateParamsForPath(Router.asPath, input));
    }
  }, [input, refreshDep]);

  return null;
};
export default useQueryTracker;
