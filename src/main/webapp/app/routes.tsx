import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Loading from 'app/shared/layout/loading/loading';
import { AUTHORITIES } from 'app/config/constants';

// tslint:disable:space-in-parens
const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ 'app/modules/login/login'),
  loading: () => <Loading />
});

const Register = Loadable({
  loader: () => import(/* webpackChunkName: "register" */ 'app/modules/account/register/register'),
  loading: () => <Loading />
});

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'app/modules/home/home'),
  loading: () => <Loading />
});
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/dang-nhap" component={Login} />
      <ErrorBoundaryRoute path="/thoat" component={Logout} />
      <ErrorBoundaryRoute path="/dang-ky" component={Register} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
