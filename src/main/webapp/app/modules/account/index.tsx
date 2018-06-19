import * as React from 'react';
import { Route } from 'react-router-dom';

import House from './house/house';
import Post from './post/post';
import Preview from './preview/preview';
import Settings from './settings/settings';
import Password from './password/password';

const Routes = ({ match }) => (
  <div>
    <Route path={`${match.url}/danh-sach-tin-dang`} component={House} />
    <Route path={`${match.url}/dang-tin`} component={Post} />
    <Route path={`${match.url}/sua-tin-dang/:id`} component={Post} />
    <Route path={`${match.url}/xem-truoc-tin-dang/:id`} component={Preview} />
    <Route path={`${match.url}/thong-tin-tai-khoan`} component={Settings} />
    <Route path={`${match.url}/thay-doi-mat-khau`} component={Password} />
  </div>
);

export default Routes;
