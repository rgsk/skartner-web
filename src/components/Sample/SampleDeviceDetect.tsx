import { isIpad, isTouchDevice } from 'constants/globalConstants';
import useWindowSize from 'hooks/utils/useWindowSize';
import dynamic from 'next/dynamic';
import { isDesktop, isMobile, isMobileOnly } from 'react-device-detect';
import RenderObject from './RenderObject';

interface ISampleDeviceDetectProps {}
const SampleDeviceDetect: React.FC<ISampleDeviceDetectProps> = ({}) => {
  // this hook we use to ensure that
  // on windowSize change the component is rendered
  const {} = useWindowSize();
  return (
    <div>
      <Checks />
      <DeviceDetectChecks />
      <Conditions />
    </div>
  );
};
export default SampleDeviceDetect;

interface IChecksProps {}
const _Checks: React.FC<IChecksProps> = ({}) => {
  return (
    <div className="p-4">
      <RenderObject
        obj={{
          [`'ontouchstart' in window`]: 'ontouchstart' in window,

          [`navigator.maxTouchPoints`]: navigator.maxTouchPoints,
          [`navigator.msMaxTouchPoints`]: (navigator as any).msMaxTouchPoints,
          [`navigator.userAgent`]: navigator.userAgent,
          [`/Macintosh/i.test(navigator.userAgent)`]: /Macintosh/i.test(
            navigator.userAgent
          ),
        }}
      />
    </div>
  );
};

const Checks = dynamic(() => Promise.resolve(_Checks), {
  ssr: false,
});

interface IDeviceDetectChecksProps {}
const _DeviceDetectChecks: React.FC<IDeviceDetectChecksProps> = ({}) => {
  return (
    <div className="p-4">
      <RenderObject
        obj={{
          isTouchDevice: isTouchDevice,
          isIpad: isIpad,
          isDesktop: isDesktop,
          isMobile: isMobile,
          isMobileOnly: isMobileOnly,
        }}
      />
    </div>
  );
};
const DeviceDetectChecks = dynamic(() => Promise.resolve(_DeviceDetectChecks), {
  ssr: false,
});

interface IConditionsProps {}
const _Conditions: React.FC<IConditionsProps> = ({}) => {
  return (
    <div className="p-4">
      <RenderObject
        obj={{
          'isIpad === (isMobile && !isMobileOnly)':
            isIpad === (isMobile && !isMobileOnly),
          'isTouchDevice === isMobile': isTouchDevice === isMobile,
          'isTouchDevice === !isDesktop': isTouchDevice === !isDesktop,
        }}
      />
    </div>
  );
};

const Conditions = dynamic(() => Promise.resolve(_Conditions), {
  ssr: false,
});
