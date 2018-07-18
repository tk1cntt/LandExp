import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import District from './district';
import DistrictUpdate from './district-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DistrictUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DistrictUpdate} />
      <ErrorBoundaryRoute path={match.url} component={District} />
    </Switch>
  </>
);

export default Routes;
