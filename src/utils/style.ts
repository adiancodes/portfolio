export const media = {
  desktop: 2080,
  laptop: 1680,
  tablet: 1040,
  mobile: 696,
  mobileS: 400,
};

export const pxToNum = (px: string) => Number(px.replace('px', ''));
export const numToPx = (num: number) => `${num}px`;
export const numToMs = (num: number) => `${num}ms`;

export function classes(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
