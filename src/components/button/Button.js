import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  width: 100%;
  display: flex;
  justify-content: center;

  svg {
    margin-right: 5px;
  }
`;

const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
