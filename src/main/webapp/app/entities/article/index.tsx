import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Article from './article';
import ArticleUpdate from './article-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArticleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArticleUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Article} />
    </Switch>
  </>
);

export default Routes;
