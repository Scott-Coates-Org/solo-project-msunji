import breakpoints from 'styles/breakpoints';
import styled from 'styled-components';
import { FormGroup, FormLabel, FormInput } from 'components/form/Form';
import Button from 'components/button/Button';
import LoginPattern from 'assets/images/Linth.svg';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';

const LoginFormContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px auto;

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

  @media screen and (min-width: ${breakpoints.sm}) {
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
  }
`;

const FormDivider = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 0.8rem 0;

  p {
    display: flex;
    align-items: center;
    color: var(--grey);
    &:before {
      content: '';
      background: var(--grey);
      height: 1px;
      top: 50%;
      left: 0;
      flex: 1 0 0%;
      margin-right: 1rem;
    }

    &:after {
      content: '';
      flex: 1 0 0%;
      background: var(--grey);
      height: 1px;
      top: 50%;
      left: 0;
      margin-left: 1rem;
    }
  }
`;

const componentLoginFroms = {
  login: LoginForm,
  email: EmailLogin,
};

export default function Login(props) {
  const { user } = useAuth();

  const [form, setForm] = useState('login');

  const Component = componentLoginFroms[form];

  // if user exists, redirect to home
  useEffect(() => {
    if (user) {
      const returnTo = props.location.state?.appState?.returnTo || '/generator';

      props.history.replace(returnTo);
    }
  }, [user, props.history]);

  const retVal = (
    <LoginFormContainer>
      <div className="login-pattern" />
      <div className="login-form">
        <div className="login-form__text">
          <h1>Hello!</h1>
          <p>Get started by signing in with an existing account.</p>
        </div>
        <Component {...props} setForm={setForm} />
      </div>
    </LoginFormContainer>
  );

  return retVal;
}

function LoginForm(props) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { firebase, setForm } = props;

  // right now, the oauth form shows a firebae domain.
  // do not worory, others use magic link as well https://stackoverflow.com/questions/47532134/changing-the-domain-shown-by-google-account-chooser

  const handleLogin = (provider) => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.error(error);
        alert(error);
        // ...
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return handleLogin(googleProvider);
  };
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setForm('email');
  };

  const terms = (
    <a href="#" target="_blank">
      Terms of Service
    </a>
  );

  const privacy = (
    <a href="#" target="_blank">
      Privacy Policy
    </a>
  );

  const retVal = (
    <>
      <form>
        <FormGroup fullWidth>
          <Button type="default" handleOnClick={handleEmailLogin}>
            Sign in with Email
          </Button>
        </FormGroup>
        <FormDivider>
          <p>Or</p>
        </FormDivider>
        <div>
          <Button type="brand" handleOnClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} className="mr-lg-1" />
            Continue with Google
          </Button>
        </div>
      </form>
    </>
  );

  return retVal;
}

function EmailLogin(props) {
  const { firebase } = props;

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: props.location.state?.appState.returnTo || '/generator',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}
