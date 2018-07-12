import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';

// tslint:disable:space-in-parens
const Login = Loadable({
  loader: () => import(/* webpackChunkName: "SimpleProgressWebpackPlugin" */ 'app/modules/login/login'),
  loading: () => <div>loading ...</div>
});

const Register = Loadable({
  loader: () => import(/* webpackChunkName: "register" */ 'app/modules/account/register/register'),
  loading: () => <div>loading ...</div>
});

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>
});

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'app/modules/home/home'),
  loading: () => <div>loading ...</div>
});

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ 'app/modules/search/home'),
  loading: () => <div>loading ...</div>
});

const Entities = Loadable({
  loader: () => import(/* webpackChunkName: "entities" */ 'app/entities'),
  loading: () => <div>loading ...</div>
});

const Detail = Loadable({
  loader: () => import(/* webpackChunkName: "detail" */ 'app/modules/detail/detail'),
  loading: () => <div>loading ...</div>
});
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/dang-nhap" component={Login} />
      <ErrorBoundaryRoute path="/thoat" component={Logout} />
      <ErrorBoundaryRoute path="/dang-ky" component={Register} />
      <ErrorBoundaryRoute path="/activate/:key?" component={Activate} />
      <ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />
      <ErrorBoundaryRoute path="/reset/finish/:key?" component={PasswordResetFinish} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/tai-khoan" component={Account} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <PrivateRoute path="/quan-ly" component={Entities} hasAnyAuthorities={[AUTHORITIES.STAFF]} />
      <PrivateRoute path="/bat-dong-san/:key" component={Detail} />
      <ErrorBoundaryRoute path="/tim-kiem" component={Search} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
