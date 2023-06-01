import clsx from 'clsx';
import useBreakpoints from 'hooks/utils/useBreakpoints';

interface ISampleUseBreakpointsProps {}
const SampleUseBreakpoints: React.FC<ISampleUseBreakpointsProps> = ({}) => {
  const res = useBreakpoints();
  const {
    for_xs,
    for_sm,
    for_md,
    for_lg,
    for_xl,
    for_dxl,
    xs,
    sm,
    md,
    lg,
    xl,
    dxl,
    breakpoint,
  } = res;
  return (
    <div>
      <p className="whitespace-pre">{JSON.stringify(res, null, 2)}</p>
      <p
        className={clsx({
          'text-red-100': for_xs,
          'text-red-300': for_sm,
          'text-red-500': for_md,
          'text-red-700': for_lg,
          'text-red-900': for_xl,
          'text-green-700': for_dxl,
        })}
      >
        using for_breakpoint
      </p>
      <p
        className={clsx(
          dxl
            ? 'text-green-700'
            : xl
            ? 'text-red-900'
            : lg
            ? 'text-red-700'
            : md
            ? 'text-red-500'
            : sm
            ? 'text-red-300'
            : xs
            ? 'text-red-100'
            : ''
        )}
      >
        using breakpoint keys
      </p>
      <p
        className={clsx(
          breakpoint === 'dxl'
            ? 'text-green-700'
            : breakpoint === 'xl'
            ? 'text-red-900'
            : breakpoint === 'lg'
            ? 'text-red-700'
            : breakpoint === 'md'
            ? 'text-red-500'
            : breakpoint === 'sm'
            ? 'text-red-300'
            : breakpoint === 'xs'
            ? 'text-red-100'
            : ''
        )}
      >
        using breakpoint property
      </p>
      <p
        className={clsx(
          'text-red-100',
          'sm:text-red-300',
          'md:text-red-500',
          'lg:text-red-700',
          'xl:text-red-900',
          '2xl:text-green-700'
        )}
      >
        tailwind breakpoints
      </p>
    </div>
  );
};
export default SampleUseBreakpoints;
