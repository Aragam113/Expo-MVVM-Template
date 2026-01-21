import { createTamagui } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/config/v3';

const customShorthands = {
  ...shorthands,

  // Размеры и отступы
  fs: 'fontSize',
  f: 'flex',
  w: 'width',
  h: 'height',
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingHorizontal',
  py: 'paddingVertical',

  // Позиционирование
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  pos: 'position',
  z: 'zIndex',

  // Flexbox
  fd: 'flexDirection',
  fw: 'flexWrap',
  ai: 'alignItems',
  ac: 'alignContent',
  as: 'alignSelf',
  jc: 'justifyContent',
  fg: 'flexGrow',
  fsh: 'flexShrink',
  fb: 'flexBasis',
  dsp: 'display',

  // Цвета и фон
  bg: 'backgroundColor',
  c: 'color',
  o: 'opacity',

  // Границы
  br: 'borderRadius',
  bw: 'borderWidth',
  bc: 'borderColor',
  btw: 'borderTopWidth',
  bbw: 'borderBottomWidth',
  blw: 'borderLeftWidth',
  brw: 'borderRightWidth',
  btc: 'borderTopColor',
  bbc: 'borderBottomColor',
  blc: 'borderLeftColor',
  brc: 'borderRightColor',
  btrr: 'borderTopRightRadius',
  btlr: 'borderTopLeftRadius',
  bbrr: 'borderBottomRightRadius',
  bblr: 'borderBottomLeftRadius',

  // Текст
  ta: 'textAlign',
  tt: 'textTransform',
  td: 'textDecorationLine',
  lh: 'lineHeight',
  ls: 'letterSpacing',
  ff: 'fontFamily',
  fst: 'fontStyle',
  fwt: 'fontWeight',

  // Тени
  shc: 'shadowColor',
  sho: 'shadowOpacity',
  shr: 'shadowRadius',

  // Overflow
  ov: 'overflow',
  ovx: 'overflowX',
  ovy: 'overflowY',

  // Gap
  g: 'gap',
  rg: 'rowGap',
  cg: 'columnGap',
} as const;

const config = createTamagui({
  tokens,
  themes,
  shorthands: customShorthands,
});

export type AppConfig = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
