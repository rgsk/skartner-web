import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const sleep = (millis: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
};

export const cn: typeof clsx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
