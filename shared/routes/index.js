import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import CoreLayout from '../layouts/CoreLayout';
import AtGlance from '../containers/AtGlance';
import AllProjects from '../containers/AllProjects';

export default (
  <Router>
    <Route component={CoreLayout} path="/">
      <Route path="at-a-glance" component={AtGlance} />
      <Route path="all-projects" component={AllProjects} />
    </Route>
    <Redirect from="/" to="all-projects" />
  </Router>
);
