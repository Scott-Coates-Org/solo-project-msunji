import { Grommet } from 'grommet';

const appTheme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    color: {
      base: 'rgb(33,19,13)',
    },
  },
};

const Layout = ({ children }) => {
  return <Grommet theme={appTheme}>{children}</Grommet>;
};

export default Layout;
