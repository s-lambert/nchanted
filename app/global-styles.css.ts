import { globalFontFace, globalStyle, keyframes } from '@vanilla-extract/css';
import MonaspaceKrypton from './styling/MonaspaceKrypton-ExtraLight.otf';

const krypton = 'MonaspaceKrypton';

globalFontFace(krypton, {
  src: `url("${MonaspaceKrypton}")`,
});

globalStyle('body', {
  fontFamily: krypton,
  fontWeight: '200',
  color: 'white',
  backgroundColor: 'black',
  backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  backgroundPosition: '10px 10px',
});
