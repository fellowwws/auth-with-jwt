import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./layouts/SingleColumnCentered";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import { AuthContext } from "./providers/authProvider";
import Navbar from "./components/Navbar";

function App() {
  const { authState } = useContext(AuthContext);

  if (authState === "loading") return null;

  return (
    <Router>
      <Navbar />

      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <LogIn />
        </Route>
      </Switch>
    </Router>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Welcome!</h2>
    </div>
  );
}

function SignUp() {
  return (
    <Layout>
      <h1 className='text-center py-2'>Sign Up</h1>
      <SignUpForm />
    </Layout>
  );
}

function LogIn() {
  return (
    <Layout>
      <h1 className='text-center py-2'>Log In 🔐</h1>
      <LogInForm />
    </Layout>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? children : <Redirect to='/login' />)}
    />
  );
}

export default App;
