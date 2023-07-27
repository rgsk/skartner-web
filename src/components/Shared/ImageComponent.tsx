/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import clsx from 'clsx';
import { ImgHTMLAttributes } from 'react';

// SAMPLE: Checkout SampleImageWithAspects

interface IImageComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const ImageComponent: React.FC<IImageComponentProps> = ({
  aspectRatio,
  className,
  objectFit,
  style,
  ...props
}) => {
  return (
    <div
      className="relative"
      style={{
        paddingBottom: getPaddingBottom(aspectRatio),
      }}
    >
      <img
        {...props}
        className={clsx(className, 'absolute w-full h-full')}
        style={{
          ...style,
          objectFit: objectFit,
        }}
      />
    </div>
  );
};
export default ImageComponent;

export const getPaddingBottom = (aspectRatio: number) => {
  const paddingBottom = (1 / aspectRatio) * 100;
  return `${paddingBottom}%`;
};
