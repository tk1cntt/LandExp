import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Logout from 'app/modules/login/logout';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Loading from 'app/shared/layout/loading/loading';
import { AUTHORITIES } from 'app/config/constants';

// tslint:disable:space-in-parens
const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'app/mobile/home/home'),
  loading: () => <Loading />
});
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/thoat" component={Logout} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
