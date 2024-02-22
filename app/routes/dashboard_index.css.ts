import { style } from '@vanilla-extract/css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  width: 500,
  height: 300,
  padding: 10,
  border: '1px solid white',
  shapeOutside: 'polygon(65px 200px,65px 450px,350px 450px,350px 80px,160px 80px)',
  backgroundColor: 'rgba(0,0,0,0.6)',
});

export const cardHeader = style({
  flex: '0 0 auto',
  margin: 0,
  marginBottom: 10,
});
