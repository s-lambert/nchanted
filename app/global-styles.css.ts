import { globalFontFace, style } from '@vanilla-extract/css';
import MonaspaceKrypton from './styling/MonaspaceKrypton-Light.otf';

const krypton = 'MonaspaceKrypton';

globalFontFace(krypton, {
  src: `url("${MonaspaceKrypton}")`,
});

export const root = style({
  fontFamily: krypton,
});
