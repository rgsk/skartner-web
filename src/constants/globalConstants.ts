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

// below are some sample user agents on ipad
/*
Chrome
Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/115.0.5790.160 Mobile/15E148 Safari/604.1

Safari
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15

Webview
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)
*/
export const isIpad =
  typeof window !== 'undefined' &&
  (/Macintosh/i.test(navigator.userAgent) ||
    /iPad/i.test(navigator.userAgent)) &&
  navigator.maxTouchPoints > 1;
