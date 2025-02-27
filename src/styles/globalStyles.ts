import { createGlobalStyle } from 'styled-components';
import Ferry from '../assets/fonts/ferry_black.otf';

export const colors = {
  primary: {
    teal: 'rgba(2, 148, 145, 1)',
    black: 'rgba(0, 0, 0, 1)',
    white: 'rgba(255, 255, 255, 1)',
  },
  secondary: {
    orange: 'rgba(255, 182, 79, 1)',
    lightTeal: 'rgba(124, 227, 225, 1)',
    lightTealHover: 'rgb(113,204,202)',
    blue: 'rgba(89, 112, 255, 1)',
    blueHover: 'rgb(67,84,190)',
  },
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Ferry';
    src: url(${Ferry}) format('opentype');
  }
  
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    
    color: ${colors.primary.black};
    background-color: ${colors.primary.white};
    
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
