import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserFeed from './user-feed';
import UserFeedDetail from './user-feed-detail';
import UserFeedUpdate from './user-feed-update';
import UserFeedDeleteDialog from './user-feed-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserFeedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserFeedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserFeedDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserFeed} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserFeedDeleteDialog} />
  </>
);

export default Routes;
