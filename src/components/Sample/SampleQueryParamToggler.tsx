import useBreakpoints from 'hooks/utils/useBreakpoints';
import useQueryParamToggler from 'hooks/utils/useQueryParamToggler';

interface ISampleQueryParamTogglerProps {}
const SampleQueryParamToggler: React.FC<
  ISampleQueryParamTogglerProps
> = ({}) => {
  const { sm } = useBreakpoints();
  const imagePreviewToggler = useQueryParamToggler('image-preview', {
    enabled: sm,
  });
  return (
    <div className="text-xs">
      <button
        onClick={() => {
          imagePreviewToggler.activate();
        }}
      >
        show
      </button>
      <button
        onClick={() => {
          imagePreviewToggler.deactivate();
        }}
      >
        hide
      </button>
      {imagePreviewToggler.active && <p className="p-2">image</p>}
    </div>
  );
};
export default SampleQueryParamToggler;
