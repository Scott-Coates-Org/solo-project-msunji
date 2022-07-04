import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/button/Button';
import Shapes from './Shapes';

const StyledHome = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fffff2;
`;

const HomeContainer = styled.div`
  position: relative;
  display: flex;

  .home-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  }
`;

const HomeButton = styled(Button)`
  font-size: 1.7rem;
`;

const Home = () => {
  return (
    <StyledHome>
      <HomeContainer>
        <Shapes />
        <div className="home-text">
          <h1>Kulay</h1>
          <p>
            <strong>Kulay</strong> makes colour palettes that consist of
            dominant colours on a website.
          </p>
          <Link to="/generator">
            <HomeButton type="orange" width="auto" shape="pill" size="lg">
              Get Started
            </HomeButton>
          </Link>
        </div>
      </HomeContainer>
    </StyledHome>
  );
};

export default Home;
