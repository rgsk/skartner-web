import { breakpoints } from 'constants/globalConstants';
import { useMemo } from 'react';
import useWindowSize from './useWindowSize';

const useBreakpoints = () => {
  const { windowWidth } = useWindowSize();

  const result = useMemo(() => {
    const breakpoint = (() => {
      if (windowWidth < breakpoints.sm) {
        return 'xs';
      } else if (windowWidth < breakpoints.md) {
        return 'sm';
      } else if (windowWidth < breakpoints.lg) {
        return 'md';
      } else if (windowWidth < breakpoints.xl) {
        return 'lg';
      } else if (windowWidth < breakpoints.dxl) {
        return 'xl';
      } else {
        return 'dxl';
      }
    })();

    const xs = windowWidth >= breakpoints.xs;
    const sm = windowWidth >= breakpoints.sm;
    const md = windowWidth >= breakpoints.md;
    const lg = windowWidth >= breakpoints.lg;
    const xl = windowWidth >= breakpoints.xl;
    const dxl = windowWidth >= breakpoints.dxl;

    return {
      xs,
      sm,
      md,
      lg,
      xl,
      dxl,
      breakpoint: breakpoint as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'dxl',
      for_xs: breakpoint === 'xs',
      for_sm: breakpoint === 'sm',
      for_md: breakpoint === 'md',
      for_lg: breakpoint === 'lg',
      for_xl: breakpoint === 'xl',
      for_dxl: breakpoint === 'dxl',
    };
  }, [windowWidth]);

  return result;
};

export default useBreakpoints;
