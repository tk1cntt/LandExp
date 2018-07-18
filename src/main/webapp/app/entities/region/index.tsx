import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Region from './region';
import RegionUpdate from './region-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RegionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RegionUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Region} />
    </Switch>
  </>
);

export default Routes;
