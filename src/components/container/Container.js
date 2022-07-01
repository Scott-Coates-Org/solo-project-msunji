import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 80%;
  max-width: 1100px;
  margin: auto;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
