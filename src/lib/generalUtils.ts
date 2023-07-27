export const sleep = (millis: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
};
import clsx from 'clsx';
export const cn = clsx;
