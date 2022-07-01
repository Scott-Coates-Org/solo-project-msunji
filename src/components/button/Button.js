import themeColours from 'styles/themeColours';
import styled from 'styled-components';

const buttonColours = {
  default: themeColours.blueDark,
  brand: themeColours.blue,
};

const buttonTextColours = {
  default: themeColours.white,
  brand: themeColours.black,
};

const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  width: 100%;
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
