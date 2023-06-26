import { updateParamsForPath } from 'lib/queryParamsUtils';
import Router, { useRouter } from 'next/router';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  const cbRef = useRef(cb);
  const trackQueryRef = useRef(true);
  cbRef.current = cb;
  const inputRef = useRef(input);
  inputRef.current = input;

  const stringifiedInput = useMemo(() => {
    return JSON.stringify(input);
  }, [input]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!enabled) return;
    if (trackQueryRef.current) {
      cbRef.current({
        params: router.query,
      });
      setTrackState(true);
    }
  }, [enabled, router.isReady, router.query]);

  useEffect(() => {
    const [] = [stringifiedInput];

    if (trackState) {
      if (firstTrackRef.current) {
        firstTrackRef.current = false;
        // here Router is used instead of Router,
        // because we didn't wanted to provide router
        // as a useEffect depedency and run on every router.query change
        Router.replace(updateParamsForPath(Router.asPath, inputRef.current));
      } else {
        Router.push(updateParamsForPath(Router.asPath, inputRef.current));
      }
      trackQueryRef.current = false;
      setTimeout(() => {
        trackQueryRef.current = true;
      });
    }
  }, [trackState, stringifiedInput]);

  return null;
};
export default useQueryTracker;
