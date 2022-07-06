import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/button/Button';
import Shapes from './Shapes';

const StyledHome = styled.section`
  min-height: 100vh;
  background: #fffff2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HomeContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;

  .home-text {
    width: 100%;
    max-width: 900px;

    padding: 0 2rem;
    h1 {
      padding-top: 0;
    }
    z-index: 10;
    p {
      font-size: 2rem;
    }
  }
`;

const HomeButton = styled(Button)`
  font-size: 1.7rem;
  border: 2px solid black;
`;

const Home = () => {
  return (
    <StyledHome>
      <HomeContainer>
        <div className="home-text">
          <h1>Kulay</h1>
          <p>
            <strong>Kulay</strong> is a simple tool for making colour palettes.
          </p>
          <Link to="/generator">
            <HomeButton type="orange" width="auto" shape="pill" size="lg">
              Get Started
            </HomeButton>
          </Link>
        </div>
        <Shapes />
      </HomeContainer>
    </StyledHome>
  );
};

export default Home;
