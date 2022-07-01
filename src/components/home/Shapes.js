import theme from 'styles/theme';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const StyledShapes = styled.div`
  position: relative;
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
  filter: blur(3.5rem);
  mix-blend-mode: multiply;
  opacity: 0.65;
  animation: ${float} 9s infinite;
`;

const YellowCircle = styled(Circle)`
  top: -6rem;
  right: 8rem;
  background-color: ${theme.colors.satin};
`;

const BlueCircle = styled(Circle)`
  bottom: -30rem;
  left: 10rem;
  background-color: ${theme.colors.blue};
  animation-delay: 2s;
`;

const SatinCircle = styled(Circle)`
  top: -4rem;
  left: -3rem;
  background-color: ${theme.colors.mustard};
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
