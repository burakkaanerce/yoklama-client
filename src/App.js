import React, { useEffect } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Home from './screens/Home';
import NewRegistration from './screens/NewRegistration';

import AdminIndex from './screens/Admin/AdminIndex';

import { whoAmIFunc } from './api/lecturer';
import { loginAction, authSelector } from './slices/userSlice';

function PrivateRoute({ children, ...rest }) {
  const { auth } = useSelector(authSelector);
  return (
    <Route
      {...rest}
      render={({ location }) => (auth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ))
      }
    />
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      whoAmIFunc({ token })
        .then((result) => {
          const { data } = result;
          if (data) {
            const { success, user } = data;

            if (success && user) {
              dispatch(loginAction({ token, user })).then((result) => {
              });
            }
          }
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register/:id">
          <NewRegistration />
        </Route>
        <Route exact path="/register">
          <Redirect to={{
            pathname: '/',
          }}
          />
        </Route>
        <PrivateRoute exact path="/admin">
          <AdminIndex />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
