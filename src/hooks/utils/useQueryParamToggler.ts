import { useGlobalContext } from 'context/GlobalContext';
import { addParamsToPath, removeParamsFromPath } from 'lib/queryParamsUtils';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

const VALUE = 'true';

const useQueryParamToggler = (
  queryParam: string,
  { enabled = true }: { enabled?: boolean } = { enabled: true }
) => {
  const { pathHistory } = useGlobalContext();
  const router = useRouter();

  const queryParamAttached = useMemo(
    () => router.query[queryParam] === VALUE,
    [queryParam, router.query]
  );

  const activate = useCallback(() => {
    if (!enabled) return;
    if (!queryParamAttached) {
      // Router is used instead of router for mutations to avoid adding router as dependency
      const withParamPath = addParamsToPath(Router.asPath, {
        [queryParam]: VALUE,
      });
      Router.push(withParamPath);
    }
  }, [enabled, queryParam, queryParamAttached]);

  const deactivate = useCallback(() => {
    if (queryParamAttached) {
      // Router is used instead of router for mutations to avoid adding router as dependency
      const withoutParamPath = removeParamsFromPath(Router.asPath, [
        queryParam,
      ]);
      if (pathHistory[pathHistory.length - 2] === withoutParamPath) {
        Router.back();
      } else {
        Router.replace(withoutParamPath);
      }
    }
  }, [pathHistory, queryParam, queryParamAttached]);

  useEffect(() => {
    if (!enabled) {
      deactivate();
    }
  }, [deactivate, enabled]);

  return {
    active: enabled && queryParamAttached,
    activate,
    deactivate,
  };
};
export default useQueryParamToggler;
