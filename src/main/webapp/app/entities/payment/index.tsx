import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Payment from './payment';
import PaymentDetail from './payment-detail';
import PaymentUpdate from './payment-update';
import PaymentDeleteDialog from './payment-delete-dialog';
import PaymentApproveDialog from './payment-approve-dialog';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const Routes = ({ match }) => (
  <>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new`} component={PaymentUpdate} hasAnyAuthorities={[AUTHORITIES.MANAGER]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={PaymentUpdate} hasAnyAuthorities={[AUTHORITIES.MANAGER]} />
      <PrivateRoute exact path={`${match.url}/:id`} component={PaymentDetail} hasAnyAuthorities={[AUTHORITIES.MANAGER]} />
      <PrivateRoute path={match.url} component={Payment} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
    </Switch>
    <PrivateRoute path={`${match.url}/:id/delete`} component={PaymentDeleteDialog} hasAnyAuthorities={[AUTHORITIES.MANAGER]} />
    <PrivateRoute path={`${match.url}/:id/approve`} component={PaymentApproveDialog} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
  </>
);

export default Routes;
