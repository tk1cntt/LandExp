import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Ward from './ward';
import WardDetail from './ward-detail';
import WardUpdate from './ward-update';
import WardDeleteDialog from './ward-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={WardUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={WardUpdate} />
      <Route exact path={`${match.url}/:id`} component={WardDetail} />
      <Route path={match.url} component={Ward} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={WardDeleteDialog} />
  </>
);

export default Routes;
