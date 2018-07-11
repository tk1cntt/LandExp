import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserTracking from './user-tracking';
import UserTrackingDetail from './user-tracking-detail';
import UserTrackingUpdate from './user-tracking-update';
import UserTrackingDeleteDialog from './user-tracking-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserTrackingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserTrackingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserTrackingDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserTracking} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserTrackingDeleteDialog} />
  </>
);

export default Routes;
