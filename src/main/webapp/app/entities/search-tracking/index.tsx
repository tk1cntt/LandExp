import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SearchTracking from './search-tracking';
import SearchTrackingDetail from './search-tracking-detail';
import SearchTrackingUpdate from './search-tracking-update';
import SearchTrackingDeleteDialog from './search-tracking-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SearchTrackingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SearchTrackingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SearchTrackingDetail} />
      <ErrorBoundaryRoute path={match.url} component={SearchTracking} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SearchTrackingDeleteDialog} />
  </>
);

export default Routes;
