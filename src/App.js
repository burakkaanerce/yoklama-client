import React, { useState } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import Home from './screens/Home';
import NewRegistration from './screens/NewRegistration';

import AdminIndex from './screens/Admin/AdminIndex';

function App() {
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
