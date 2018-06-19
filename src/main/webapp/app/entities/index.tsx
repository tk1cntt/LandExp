import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Region from './region';
import City from './city';
import District from './district';
import Street from './street';
import House from './house';
import ServiceFee from './service-fee';
import HouseTracking from './house-tracking';
import HousePhoto from './house-photo';
import LandProject from './land-project';
import LandProjectPhoto from './land-project-photo';
import Article from './article';
import Category from './category';
import UserProfile from './user-profile';
import UserSubscription from './user-subscription';
import UserTracking from './user-tracking';
import UserFeed from './user-feed';
import SearchTracking from './search-tracking';
import UserFinancial from './user-financial';
import UserManagement from 'app/modules/account/user-management';
import PotentialCustomer from './potential-customer';
import Banner from './banner';
import Payment from './payment';
import Ward from './ward';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <Route path={`${match.url}/khu-vuc`} component={Region} />
      <Route path={`${match.url}/tinh-thanh`} component={City} />
      <Route path={`${match.url}/quan-huyen`} component={District} />
      <Route path={`${match.url}/street`} component={Street} />
      <Route path={`${match.url}/tin-dang`} component={House} />
      <Route path={`${match.url}/bang-phi-dich-vu`} component={ServiceFee} />
      <Route path={`${match.url}/house-tracking`} component={HouseTracking} />
      <Route path={`${match.url}/house-photo`} component={HousePhoto} />
      <Route path={`${match.url}/cac-du-an`} component={LandProject} />
      <Route path={`${match.url}/land-project-photo`} component={LandProjectPhoto} />
      <Route path={`${match.url}/tin-tuc`} component={Article} />
      <Route path={`${match.url}/danh-muc-tin-tuc`} component={Category} />
      <Route path={`${match.url}/user-profile`} component={UserProfile} />
      <Route path={`${match.url}/user-subscription`} component={UserSubscription} />
      <Route path={`${match.url}/user-tracking`} component={UserTracking} />
      <Route path={`${match.url}/user-feed`} component={UserFeed} />
      <Route path={`${match.url}/search-tracking`} component={SearchTracking} />
      <Route path={`${match.url}/tu-van-tai-chinh`} component={UserFinancial} />
      <Route path={`${match.url}/khach-hang-tiem-nang`} component={PotentialCustomer} />
      <Route path={`${match.url}/banner`} component={Banner} />
      <Route path={`${match.url}/thanh-toan`} component={Payment} />
      <Route path={`${match.url}/xa-phuong`} component={Ward} />
      <Route path={`${match.url}/tai-khoan-nguoi-dung`} component={UserManagement} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
