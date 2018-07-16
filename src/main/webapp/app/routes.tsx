import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

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

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <Loading />
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <Loading />
});

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'app/modules/home/home'),
  loading: () => <Loading />
});

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ 'app/modules/search/home'),
  loading: () => <Loading />
});

const Entities = Loadable({
  loader: () => import(/* webpackChunkName: "entities" */ 'app/entities'),
  loading: () => <Loading />
});

const Detail = Loadable({
  loader: () => import(/* webpackChunkName: "detail" */ 'app/modules/detail/detail'),
  loading: () => <Loading />
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
      <ErrorBoundaryRoute path="/bat-dong-san/:id/:link" component={Detail} />
      <ErrorBoundaryRoute path="/tim-kiem" component={Search} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
