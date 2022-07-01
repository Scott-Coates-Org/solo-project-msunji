import theme from 'styles/theme';
import styled from 'styled-components';

const buttonColours = {
  default: theme.colors.blueDark,
  brand: theme.colors.blue,
  orange: theme.colors.orange,
};

const buttonTextColours = {
  default: theme.colors.white,
  brand: theme.colors.black,
  orange: theme.colors.black,
};

const buttonSizes = {
  auto: 'auto',
  full: '100%',
};

const StyledButton = styled.button`
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 2rem;
  width: ${({ size }) => buttonSizes[size]};
  display: flex;
  justify-content: center;
  background-color: ${({ type }) => buttonColours[type]};
  font-weight: bold;
  color: ${({ type }) => buttonTextColours[type]};
  svg {
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Button = ({ type, children, handleOnClick }) => {
  return (
    <StyledButton type={type} onClick={handleOnClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
