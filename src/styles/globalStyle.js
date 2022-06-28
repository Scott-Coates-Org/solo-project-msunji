import themeColours from './themeColours';
import { createGlobalStyle } from 'styled-components';

import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --mustard: ${themeColours.mustard};
    --black:  ${themeColours.black};
    --blue: ${themeColours.blue};
    --blue-grey-light:  ${themeColours.blueGreyLight};
    --blue-dark:  ${themeColours.blueDark};
    --grey:  ${themeColours.grey};
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    width: 100%;
    font-size: 16px/1.6;
    color: var(--black);
  }
  h1, h2, h3 {
    font-weight: bold;
  }
  h1 {
    font-size: 5.06em;
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

`;

export default GlobalStyle;
