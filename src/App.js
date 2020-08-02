import React, { useEffect } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect, useHistory
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Home from './screens/Home';
import NewRegistration from './screens/NewRegistration';

import AdminIndex from './screens/Admin/AdminIndex';

import { whoAmIFunc } from './api/lecturer';
import { loginAction } from './slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("history: ", history)
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      whoAmIFunc({ token })
        .then((result) => {
          console.log('result: ', result);
          const { data } = result;
          if (data) {
            const { success, user } = data;

            if (success && user) {
              console.log('user: ', user);
              dispatch(loginAction({ token, user })).then((result) => {
                console.log('result: ', result);
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
        <Route exact path="/admin">
          <AdminIndex />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
