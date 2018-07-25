import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import House from './house/house';
import Post from './post/post';
import Edit from './post/edit';
import Payment from './payment/payment';
import Settings from './settings/settings';
import Password from './password/password';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/danh-sach-tin-dang`} component={House} />
    <ErrorBoundaryRoute path={`${match.url}/dang-tin`} component={Post} />
    <ErrorBoundaryRoute path={`${match.url}/sua-tin-dang/:id`} component={Edit} />
    <ErrorBoundaryRoute path={`${match.url}/thanh-toan/:id`} component={Payment} />
    <ErrorBoundaryRoute path={`${match.url}/thong-tin-tai-khoan`} component={Settings} />
    <ErrorBoundaryRoute path={`${match.url}/thay-doi-mat-khau`} component={Password} />
  </div>
);

export default Routes;
