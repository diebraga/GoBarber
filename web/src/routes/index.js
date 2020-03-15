import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// import your pages here
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/SignUp" component={SignUp} />

      <Route path="/Profile" component={Profile} isPrivate />
      <Route path="/Dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}

export default Routes;
