import styled from 'styled-components';
import { FormGroup, FormLabel, FormInput } from 'components/form/Form';
import Button from 'components/button/Button';
import LoginPattern from 'assets/images/Linth.svg';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';

const LoginFormContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 2fr 3fr;

  .login-pattern {
    background: var(--mustard);
    background-image: url(${LoginPattern});
  }
  .login-form {
    width: 55%;
    max-width: 600px;
    margin: auto;

    &__text {
      margin-bottom: 3rem;
    }
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
      background:var(--grey);
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
      const returnTo = props.location.state?.appState?.returnTo || '/';

      props.history.replace(returnTo);
    }
  }, [user, props.history]);

  const retVal = (
    /* todo - wrap in layout container */
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
        // alert(error);
        // ...
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return handleLogin(googleProvider);
  };

  const handleFacebookLogin = (e) => {
    e.preventDefault();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return handleLogin(facebookProvider);
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
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <FormInput
            type="email"
            placeholder="Your Email"
            id="email"
            {...register('email', { required: 'A valid email is required.' })}
          ></FormInput>
          <Button onClick={handleEmailLogin}>Sign In</Button>
        </FormGroup>
        <FormDivider>
          <p>Or</p>
        </FormDivider>
        <div>
          <Button onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} className="mr-lg-1" />
            Continue with Google
          </Button>
        </div>
      </form>
    </>

    // <Form>
    //   <FormGroup>
    //     <p className="small text-left text-muted font-weight-light">
    //       By proceeding, you are agreeing to the {terms} and {privacy}.
    //     </p>
    //   </FormGroup>
    //   <Row form>
    //     <Col md={6}>
    //       <FormGroup>
    //         {/*   <Label for="about.firstName">First Name</Label>
    //         <Input type="text" /> */}
    //         <Button
    //           className="btn-block btn-light d-flex flex-row justify-content-around align-items-center"
    //           onClick={handleGoogleLogin}
    //         >
    //           <FontAwesomeIcon icon={faGoogle} className="mr-lg-1" />
    //           Continue with Google
    //         </Button>
    //       </FormGroup>
    //     </Col>
    //     <Col md={6}>
    //       <FormGroup>
    //         {/* for some reason btn-primary does not work? */}
    //         <Button
    //           className="btn-block d-flex flex-row justify-content-around align-items-center"
    //           color="primary"
    //           onClick={handleFacebookLogin}
    //         >
    //           <FontAwesomeIcon icon={faFacebook} />
    //           Continue with Facebook
    //         </Button>
    //       </FormGroup>
    //     </Col>
    //   </Row>
    //   <p className="small text-center font-weight-light">or</p>
    //   <FormGroup>
    //     <p className="small text-center text-muted font-weight-light">
    //       <a href="#" onClick={handleEmailLogin}>
    //         Login with email address.
    //       </a>
    //     </p>
    //   </FormGroup>
    // </Form>
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
    signInSuccessUrl: props.location.state?.appState.returnTo || '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}
