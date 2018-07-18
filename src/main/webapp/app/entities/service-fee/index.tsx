import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ServiceFee from './service-fee';
import ServiceFeeUpdate from './service-fee-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ServiceFeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ServiceFeeUpdate} />
      <ErrorBoundaryRoute path={match.url} component={ServiceFee} />
    </Switch>
  </>
);

export default Routes;
