import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  FormText,
  Spinner,
} from "reactstrap";
import { isValidEmail, isValidPassword } from "../utils/validators";
import { AuthContext } from "../providers/authProvider";
import { useHistory, useLocation } from "react-router-dom";

function LogInForm() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [displayErrors, setDisplayErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setErrors({
      ...errors,
      email: isValidEmail(email),
      password: isValidPassword(password),
    });
  }, [email, password]);

  const hasErrors = () => {
    return errors.email || errors.password;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (hasErrors()) {
      if (displayErrors === false) {
        setDisplayErrors(true);
      }
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        auth
          .logIn(email, password)
          .then(() => {
            setIsSubmitting(false);
            history.push("/");
          })
          .catch((error) => {
            setErrors({ ...errors, server: error.message });
            setIsSubmitting(false);
          });
      }, 1000);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {errors.server && (
        <Alert color='danger'>
          <strong>Error</strong> {errors.server}
        </Alert>
      )}
      <FormGroup>
        <Label className='sr-only' for='email'>
          Email
        </Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          name='email'
          id='email'
          placeholder='Email address'
          invalid={displayErrors && errors.email}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className='sr-only' for='password'>
          Password
        </Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          invalid={displayErrors && errors.password}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <Button
        block
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        color='primary'
        size='lg'
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner color='light' /> : "Log in"}
      </Button>
    </Form>
  );
}

export default LogInForm;
