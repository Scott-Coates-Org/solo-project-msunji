import theme from 'styles/theme';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormGroup, FormLabel, FormInput } from 'components/form/Form';
import Button from 'components/button/Button';
import LoginPattern from 'assets/images/Linth.svg';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';

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
