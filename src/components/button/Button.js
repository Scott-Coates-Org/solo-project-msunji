import theme from 'styles/theme';
import styled from 'styled-components';

const buttonColours = {
  default: theme.colors.mustard,
  brand: theme.colors.blue,
  orange: theme.colors.orange,
};
const buttonWidth = {
  auto: 'auto',
  full: '100%',
};

const buttonSizes = {
  normal: '1rem',
  lg: '1.4rem',
};

const StyledButton = styled.button`
  border: 4px solid var(--black);
  color: var(--black);
  padding: 0.6rem 2rem;
  font-size: ${({ size }) => buttonSizes[size]};
  width: ${({ width }) => buttonWidth[width]};
  background-color: ${({ type }) => buttonColours[type]};
  font-weight: bold;
  box-shadow: 0.4rem 0.4rem var(--black);
  svg {
    margin-right: 10px;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--black);
    color: ${({ type }) => buttonColours[type]};
    box-shadow: 0.4rem 0.4rem ${({ type }) => buttonColours[type]};
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
