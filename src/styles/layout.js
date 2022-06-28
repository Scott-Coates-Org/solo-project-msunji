import { Grommet, Main } from 'grommet';
import Navbar from 'components/navbar/Navbar';

const appTheme = {
  global: {
    font: {
      family: 'Poppins',
      size: '18px',
      height: '1.2',
    },
    color: {
      base: 'rgb(33,19,13)',
    },
  },
};

const Layout = ({ children }) => {
  return (
    <Grommet theme={appTheme}>
      <Navbar />
      <Main> {children}</Main>
    </Grommet>
  );
};

export default Layout;
