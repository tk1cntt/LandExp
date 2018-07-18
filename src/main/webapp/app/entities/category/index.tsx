import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Category from './category';
import CategoryUpdate from './category-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CategoryUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Category} />
    </Switch>
  </>
);

export default Routes;
