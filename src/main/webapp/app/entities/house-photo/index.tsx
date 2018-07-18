import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HousePhoto from './house-photo';
import HousePhotoUpdate from './house-photo-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HousePhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HousePhotoUpdate} />
      <ErrorBoundaryRoute path={match.url} component={HousePhoto} />
    </Switch>
  </>
);

export default Routes;
