import theme from './theme';
import { createGlobalStyle } from 'styled-components';

import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --white: ${theme.colors.white};
    --mustard: ${theme.colors.mustard};
    --black:  ${theme.colors.black};
    --blue: ${theme.colors.blue};
    --blue-grey-light:  ${theme.colors.blueGreyLight};
    --blue-dark:  ${theme.colors.blueDark};
    --grey:  ${theme.colors.grey};
    --orange: ${theme.colors.orange};
    --satin: ${theme.colors.satin};
    --magenta: ${theme.colors.magenta};
    --monotype: 'Anonymous Pro', monospace;
    --sansSerif: 'Archivo Black', sans-serif;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *:before,
  *:after {
      box-sizing: border-box;
  }
  html, body {
    overflow-x: hidden;
  }
  body {
    margin: 0;
    font-family: var(--monotype);
    height: 100vh;
    width: 100%;
    font-size: 16px;
    line-height: 1.6;
    color: var(--black);
  }
  h1, h2, h3 {
    font-family: var(--sansSerif);
  }
  h1 {
    font-size: 5.06em;
    font-size: clamp(2.5rem, -0.7rem + 10.24vw, 5.06rem);
    line-height: 1.28em;
    padding-top: 0.296em;
    margin-bottom: 0.0247em;
  }
  h2 {
    font-size: 3.38em;
    line-height: 1.44em;
    padding-top: 0.389em;
    margin-bottom: 0.0926em;
  }
  h3 {
    font-size: 2.25em;
    line-height: 1.44em;
    padding-top: 0.389em;
    margin-bottom: 0.333em;
  }
  h4 {
    font-size: 1.50em;
    line-height: 1.08em;
    padding-top: 0.208em;
    margin-bottom: 0.875em;
  }
  p {
    font-size: 1.00em;
    line-height: 1.63em;
    padding-top: 0.500em;
    margin-bottom: 1.13em;
  }
  strong {
    font-weight: bold;
  }
  a, a:visited {
    font-weight: bold;
    text-decoration: none;
  }

  p > a, a:visited {
    color: ${theme.colors.satin}
  }

`;

export default GlobalStyle;
