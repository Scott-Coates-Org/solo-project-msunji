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
  orange: theme.colors.white,
};

const buttonWidth = {
  auto: 'auto',
  full: '100%',
};

const buttonSizes = {
  normal: '1rem',
  lg: '1.6rem',
};

const StyledButton = styled.button`
  border: none;
  border-radius: 100px;
  padding: 0.6rem 2rem;
  font-size: ${({ size }) => buttonSizes[size]};
  width: ${({ width }) => buttonWidth[width]};
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

const Button = ({ type, children, handleOnClick, size, width }) => {
  return (
    <StyledButton type={type} onClick={handleOnClick} width={width} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;
