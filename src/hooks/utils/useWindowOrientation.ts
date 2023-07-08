import { sleep } from 'lib/generalUtils';
import { useEffect, useState } from 'react';

const useWindowOrientation = () => {
  const [orientation, setOrientation] = useState<
    'portrait' | 'landscape-primary' | 'landscape-secondary'
  >('portrait');

  useEffect(() => {
    const cbOrientationChange = async () => {
      await sleep(100);
      switch (window.orientation) {
        case 90:
          setOrientation('landscape-primary');
          break;
        case -90:
          setOrientation('landscape-secondary');
          break;
        case 0:
          setOrientation('portrait');
          break;
      }
    };
    cbOrientationChange();
    window.addEventListener('orientationchange', cbOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', cbOrientationChange);
    };
  }, []);
  return orientation;
};
export default useWindowOrientation;
