import theme from 'styles/theme';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const StyledShapes = styled.div`
  position: relative;
  width: inherit;
  height: 100%;
`;
const float = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(25px, -30px) scale(1.01);
  }
  66% {
    transform: translate(-20px, 25px) scale(0.9);
  }
  99% {
    transform: translate(0px, 0px) scale(1);
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 27rem;
  height: 27rem;
  border-radius: 50%;
  filter: blur(6rem);
  mix-blend-mode: multiply;
  opacity: 0.65;
  animation: ${float} 9s infinite;
`;

const SatinCircle = styled(Circle)`
  top: -30rem;
  left: 7rem;
  background-color: ${theme.colors.magenta};
`;

const BlueCircle = styled(Circle)`
  bottom: -15rem;
  left: 5rem;
  background-color: ${theme.colors.blue};
  animation-delay: 2s;
`;

const YellowCircle = styled(Circle)`
  top: -30rem;
  left: -20rem;
  background-color: #fdff59;
  animation-delay: 4s;
`;

const Shapes = () => {
  return (
    <StyledShapes>
      <YellowCircle />
      <BlueCircle />
      <SatinCircle />
    </StyledShapes>
  );
};

export default Shapes;
