import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Col,
  Row,
  Alert,
  Spinner,
} from "reactstrap";
import {
  isValidEmail,
  isValidPassword,
  isValidMatch,
  isEmpty,
  isEqual,
} from "../utils/validators";
import { f, strim } from "../utils/sanitisers";
import { AuthContext } from "../providers/authProvider";
import { useHistory, useLocation } from "react-router-dom";

function SignUpForm() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState({
    forename: false,
    surname: false,
    email: false,
    password: false,
    confirm: false,
  });

  const [displayErrors, setDisplayErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setErrors({
      forename: isEmpty(forename),
      surname: isEmpty(surname),
      email: isValidEmail(email),
      password: isValidPassword(password),
      confirm: isValidMatch(password, confirm),
    });
  }, [forename, surname, email, password, confirm]);

  const hasErrors = () => {
    return (
      errors.forename ||
      errors.surname ||
      errors.email ||
      errors.password ||
      errors.confirm
    );
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
        signUp(forename, surname, email, password)
          .then(() => {
            auth
              .logIn(email, password)
              .then(() => {
                history.push("/");
              })
              .catch((error) => console.log(error));
            setIsSubmitting(false);
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

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label className='sr-only' for='first-name'>
              First Name
            </Label>
            <Input
              value={forename}
              onChange={(e) => setForename(f(strim(e.target.value)))}
              type='text'
              name='first-name'
              id='first-name'
              placeholder='First name'
              invalid={displayErrors && errors.forename}
            />
            <FormFeedback>First name is required</FormFeedback>
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label className='sr-only' for='last-name'>
              Last Name
            </Label>
            <Input
              value={surname}
              onChange={(e) => setSurname(f(strim(e.target.value)))}
              type='text'
              name='last-name'
              id='last-name'
              placeholder='Last name'
              invalid={displayErrors && errors.surname}
            />
            <FormFeedback>Last name is required</FormFeedback>
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label className='sr-only' for='email'>
          Email
        </Label>
        <Input
          value={email}
          onChange={(e) => setEmail(strim(e.target.value))}
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
          onChange={(e) => setPassword(strim(e.target.value))}
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          invalid={displayErrors && errors.password}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label className='sr-only' for='confirmPassword'>
          Confirm Password
        </Label>
        <Input
          value={confirm}
          onChange={(e) => setConfirm(strim(e.target.value))}
          type='password'
          name='password'
          id='confirmPassword'
          placeholder='Confirm Password'
          invalid={displayErrors && errors.confirm}
        />
        <FormFeedback>{errors.confirm}</FormFeedback>
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
        {isSubmitting ? <Spinner color='light' /> : "Sign up"}
      </Button>
    </Form>
  );
}

export default SignUpForm;

function signUp(forename, surname, email, password) {
  return new Promise((resolve, reject) => {
    fetch("/auth/signup", {
      method: "POST",
      mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forename, surname, email, password }), // body data type must match "Content-Type" header
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((error) => reject(error));
        } else {
          response.json().then((data) => resolve(data));
        }
      })
      .catch((error) => reject(error));
  });
}
