import { globalFontFace, globalStyle, keyframes } from '@vanilla-extract/css';
import MonaspaceKrypton from './styling/MonaspaceKrypton-Light.otf';

const krypton = 'MonaspaceKrypton';

globalFontFace(krypton, {
  src: `url("${MonaspaceKrypton}")`,
});

const scrollingAnimation = keyframes({
  '0%': {
    backgroundPosition: '-10px -10px',
  },
  '50%': {
    backgroundPosition: '10px -10px',
  },
  '100%': {
    backgroundPosition: '10px 10px',
  },
});

globalStyle('body', {
  fontFamily: krypton,
  color: 'white',
  backgroundColor: 'black',
  backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  backgroundPosition: '10px 10px',
  animationName: scrollingAnimation,
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
});
