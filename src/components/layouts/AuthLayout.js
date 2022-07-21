import theme from 'styles/theme';
import styled from 'styled-components';
import LoginPattern from 'assets/images/Linth.svg';

const StyledAuth = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 210px auto;

  .login-pattern {
    background: var(--mustard);
    background-image: url(${LoginPattern});
    background-size: cover;
  }
  .login-form {
    background-color: var(--white);
    width: 80%;
    max-width: 400px;
    margin: auto;

    &__text {
      margin-bottom: 3rem;
    }
  }

  @media screen and (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
  }
`;

const AuthLayout = ({ children }) => {
  return <StyledAuth>{children}</StyledAuth>;
};

export default AuthLayout;
