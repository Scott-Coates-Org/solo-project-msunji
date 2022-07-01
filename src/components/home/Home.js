import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/button/Button';
import Container from 'components/container/Container';
import Shapes from './Shapes';

const StyledHome = styled.main`
  min-height: 100vh;
  display: flex;
`;

const HomeContainer = styled(Container)`
  position: relative;
`;

const Home = () => {
  return (
    <StyledHome>
      <HomeContainer>
        <Shapes />
        <div>
          <h1>Kulay</h1>
          <p>Text goes here</p>
          <Link to="/generate">
            <Button type="orange" size="auto" shape="pill">
              Get Started
            </Button>
          </Link>
        </div>
      </HomeContainer>
    </StyledHome>
  );
};

export default Home;
