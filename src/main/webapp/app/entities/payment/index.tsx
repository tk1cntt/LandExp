import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Payment from './payment';
import PaymentUpdate from './payment-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaymentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaymentUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Payment} />
    </Switch>
  </>
);

export default Routes;
