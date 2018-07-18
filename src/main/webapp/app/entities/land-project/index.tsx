import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LandProject from './land-project';
import LandProjectUpdate from './land-project-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LandProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LandProjectUpdate} />
      <ErrorBoundaryRoute path={match.url} component={LandProject} />
    </Switch>
  </>
);

export default Routes;
