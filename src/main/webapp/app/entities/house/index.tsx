import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import House from './house';
import HouseDetail from './house-detail';
import HouseUpdate from './house-update';
import HouseDeleteDialog from './house-delete-dialog';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const Routes = ({ match }) => (
  <>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new`} component={HouseUpdate} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={HouseUpdate} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
      <PrivateRoute exact path={`${match.url}/:id`} component={HouseDetail} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
      <PrivateRoute path={match.url} component={House} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
    </Switch>
    <PrivateRoute path={`${match.url}/:id/delete`} component={HouseDeleteDialog} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
  </>
);

export default Routes;
