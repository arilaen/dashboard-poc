import React from 'react';
import { Route, Redirect } from 'react-router';

import CoreLayout from '../layouts/CoreLayout';
import AtGlance from '../containers/AtGlance';
import AllProjects from '../containers/AllProjects';

export default (
  <Route component={CoreLayout}>
    <Redirect from="/?" to="all-projects" />

    <Route path="at-a-glance" component={AtGlance} />
    <Route path="all-projects" component={AllProjects} />
  </Route>
);
