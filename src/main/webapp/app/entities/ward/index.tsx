import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Ward from './ward';
import WardUpdate from './ward-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WardUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Ward} />
    </Switch>
  </>
);

export default Routes;
