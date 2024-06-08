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
    blue: 'rgba(89, 112, 255, 1)',
  },
};

export const fonts = {
  Inter: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  Ferry: Ferry,
};

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ${fonts.Inter};
    line-height: 1.5;
    font-weight: 400;
    
    color: ${colors.primary.black};
    background-color: ${colors.primary.white};
    
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
  }
  
  body {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
