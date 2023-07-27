/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import useResizeObserver from 'hooks/utils/useResizeObserver';
import { ImgHTMLAttributes, useRef } from 'react';

// SAMPLE: Checkout SampleImageWithAspects

interface IImageViewProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

// ImageView is an alternative of ImageComponent
// here we calculate the height based on width using useRef

const ImageView: React.FC<IImageViewProps> = ({
  aspectRatio,
  objectFit,
  style,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const rect = useResizeObserver(imgRef);
  const imgWidth = rect?.width ?? 0;
  return (
    <img
      {...props}
      ref={imgRef}
      style={{
        ...style,
        width: '100%',
        height: imgWidth / aspectRatio,
        objectFit: objectFit,
      }}
    />
  );
};
export default ImageView;
