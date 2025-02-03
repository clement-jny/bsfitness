type TBaseColor = {
  primary: string;
  secondary: string;
  accent: string;

  white: string;
  black: string;
  grey: string;
  orange: string;
};

type TColor = TBaseColor & {
  text: string;
  background: string;
  title?: string;

  selected: string;
};

const baseColor: TBaseColor = {
  primary: '#34bcb5',
  secondary: '#1F2E45', // lighter ?
  accent: '#e84579',

  white: '#fff',
  black: '#000',
  grey: '#9dafae',
  orange: '#ffac38',
};

const light: TColor = {
  ...baseColor,

  text: '#030c0c',
  background: '#ecf3f2', // #fdfeff
  // title: '',

  selected: '#f0f5f5',
};
const dark: TColor = {
  ...baseColor,

  text: '#f3fcfc',
  background: '#0c1312',
  // title: '',

  selected: '#0a0f0f',
};
// Old dark color
// primary: '#43cbc5',
// secondary: '',
// accent: '#ba174b',
// white: '#fff',
// black: '#000',
// grey: '#506261',
// orange: '#c77400',

export const colors = { light, dark };

// #1F2E45 // ! (x2) title ? titleCard, titleSection, titleCourse, titleTab ==== secondary
// #DDCAD9
// #484D6D
// #004F2D
// #083D77
