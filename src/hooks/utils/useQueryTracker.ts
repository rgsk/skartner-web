import { updateParamsForPath } from 'lib/queryParamsUtils';
import Router, { useRouter } from 'next/router';

import { useEffect, useRef, useState } from 'react';
import useToggle from './useToggle';
const useQueryTracker = (
  input: Record<string, any>,
  cb: (args: { params: Record<string, string | string[] | undefined> }) => void,
  { enabled = true }: { enabled?: boolean } = { enabled: true }
  // enabled is useful if setting state is based on some data that is fetched from an api
  // we can send enabled as false until data is loading and
) => {
  const router = useRouter();
  const [trackState, setTrackState] = useState(false);
  const firstTrackRef = useRef(true);
  const [toggleDep, toggle] = useToggle();
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    if (!router.isReady) return;
    if (!enabled) return;
    cbRef.current({
      params: Router.query,
    });
    setTrackState(true);
  }, [enabled, toggleDep, router.isReady]);

  useEffect(() => {
    const handleBackButton = () => {
      // Code to handle back button press
      toggle();
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [toggle]);

  useEffect(() => {
    if (trackState) {
      if (firstTrackRef.current) {
        firstTrackRef.current = false;
        // here Router is used instead of Router,
        // because we didn't wanted to provide router
        // as a useEffect depedency and run on every router.query change
        Router.replace(updateParamsForPath(Router.asPath, input));
      } else {
        Router.push(updateParamsForPath(Router.asPath, input));
      }
    }
  }, [input, trackState]);

  return null;
};
export default useQueryTracker;
