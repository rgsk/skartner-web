export enum LocalStorageKeys {
  user = 'user',
}

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  dxl: 1536,
};

export const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0);
// not sure where navigator.msMaxTouchPoints > 0 condition is useful

export const isIpad =
  typeof window !== 'undefined' &&
  /Macintosh/i.test(navigator.userAgent) &&
  navigator.maxTouchPoints > 1;
