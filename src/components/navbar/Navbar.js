import { Header, Box, Button } from 'grommet';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Header align="center" sticky="scrollup" pad="medium">
      <Box
        direction="row"
        justify="between"
        fill="horizontal"
        width="auto"
        align="center"
      >
        <div>Logo</div>
        <Box direction="row" gap="small">
          <Button label="Login" />
          <Button primary label="Sign Up" />
        </Box>
      </Box>
    </Header>
  );
};

export default Navbar;
