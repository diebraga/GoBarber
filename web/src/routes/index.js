import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

      <Route path="/Profile" component={Profile} />
      <Route path="/Dashboard" component={Dashboard} />
    </Switch>
  );
}

export default Routes;
