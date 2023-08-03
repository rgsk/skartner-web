import ImageComponent from 'components/Shared/ImageComponent';
import ImageView from 'components/Shared/ImageView';

interface ISampleImageWithAspectsProps {}
const SampleImageWithAspects: React.FC<ISampleImageWithAspectsProps> = ({}) => {
  return (
    <div className="max-w-[500px]">
      <ImageView
        src={
          'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/9cc3779a-bc10-444a-989c-5e9e14007726.png'
        }
        alt={''}
        aspectRatio={2}
        objectFit="contain"
        itemProp="image"
        className="border border-emerald-500 border-solid"
      />
      <ImageComponent
        src={
          'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/9cc3779a-bc10-444a-989c-5e9e14007726.png'
        }
        alt={''}
        aspectRatio={2}
        objectFit="contain"
        itemProp="image"
        className="border border-red-500 border-solid"
      />
    </div>
  );
};
export default SampleImageWithAspects;
