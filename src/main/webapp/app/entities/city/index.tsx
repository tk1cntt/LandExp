import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import City from './city';
import CityUpdate from './city-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CityUpdate} />
      <ErrorBoundaryRoute path={match.url} component={City} />
    </Switch>
  </>
);

export default Routes;
