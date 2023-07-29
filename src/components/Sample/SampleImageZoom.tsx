/* eslint-disable @next/next/no-img-element */
import ImageView from 'components/Shared/ImageView';
import MobileImageCarousel from 'components/Shared/ImageZoom/MobileImageCarousel';
import ViewLens from 'components/Shared/ImageZoom/ViewLens';
import useImageZoom from 'components/Shared/ImageZoom/useImageZoom';
import { breakpoints } from 'constants/globalConstants';
import { useGlobalContext } from 'context/GlobalContext';
import useQueryParamToggler from 'hooks/utils/useQueryParamToggler';
import useWindowSize from 'hooks/utils/useWindowSize';
import { useEffect, useMemo, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import SampleRandomContent from './SampleRandomContent';
import { sampleImages } from './SampleScrollTracker/Children/Vertical';
import VerticalImagesGrid, {
  VerticalImagesGridProxy,
} from './VerticalImagesGrid';

interface ISampleImageZoomProps {}
const SampleImageZoom: React.FC<ISampleImageZoomProps> = ({}) => {
  const { navbarRect } = useGlobalContext();
  const desktopImageZoomProps = useImageZoom({ zoomMultiplier: 3 });
  const { windowHeight, windowWidth } = useWindowSize();
  const [imgIndex, setImgIndex] = useState(1);
  const imagesPreviewType = useMemo(() => {
    // on ipad we want to show image preview
    return isDesktop && windowWidth >= breakpoints.lg ? 'desktop' : 'mobile';
  }, [windowWidth]);

  const imagePreviewToggler = useQueryParamToggler('image-preview', {
    enabled: imagesPreviewType === 'mobile',
  });
  const [windowScrollY, setWindowScrollY] = useState(0);
  useEffect(() => {
    const cb = () => {
      setWindowScrollY(window.scrollY);
    };
    window.addEventListener('scroll', cb);
    return () => {
      window.removeEventListener('scroll', cb);
    };
  }, []);

  return (
    <div className="px-2 lg:px-10">
      {imagePreviewToggler.active && (
        <MobileImageCarousel
          images={sampleImages}
          initialIndex={imgIndex}
          closeCarousel={() => {
            imagePreviewToggler.deactivate();
          }}
        />
      )}
      <div className="flex items-start gap-x-10 flex-col lg:flex-row">
        <div
          className="flex relative lg:sticky  w-full lg:w-[500px]"
          style={{
            top: windowWidth >= breakpoints.lg ? navbarRect?.height : 0,
          }}
        >
          <VerticalImagesGrid
            images={sampleImages}
            imgIndex={imgIndex}
            setImgIndex={setImgIndex}
          />
          <VerticalImagesGridProxy />
          <div
            className={`
          bg-[#F8F8F8] relative flex-1
          `}
          >
            <div
              className="flex-1 relative cursor-pointer"
              ref={desktopImageZoomProps?.imageRef}
              onClick={imagePreviewToggler.activate}
            >
              <ImageView
                src={sampleImages[imgIndex]}
                alt={''}
                aspectRatio={1}
                objectFit="contain"
                itemProp="image"
              />
            </div>

            {desktopImageZoomProps?.zoomedImageActive && (
              <ViewLens styles={desktopImageZoomProps.viewBoxStyles} />
            )}
          </div>
        </div>
        <div className="flex-1 relative">
          <div>
            {imagesPreviewType === 'desktop' &&
              desktopImageZoomProps.zoomedImageActive && (
                <div
                  className={`
                absolute bg-white z-20 shadow-2xl
                border-gray-200 border border-solid rounded-md`}
                  style={{
                    ...desktopImageZoomProps.zoomedImageContainerStyles,
                    height: windowHeight - (navbarRect?.height ?? 0),
                    top: windowScrollY,
                    width: '100%',
                  }}
                  ref={desktopImageZoomProps.zoomedImageContainerRef}
                >
                  <img
                    alt={''}
                    style={desktopImageZoomProps.zoomedImageStyles}
                    src={sampleImages[imgIndex]}
                  />
                </div>
              )}
          </div>
          <SampleRandomContent />
        </div>
      </div>
    </div>
  );
};
export default SampleImageZoom;
