import 'react-toastify/dist/ReactToastify.css';
import './app.css';

import React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Storage } from 'react-jhipster';
import ReactPiwik from 'react-piwik';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { uid } from 'app/shared/util/utils';
import history from './history';

import './style.css';
/* tslint:disable-next-line */
import 'react-image-gallery/styles/css/image-gallery.css';

const UID = 'uid';

const piwik = new ReactPiwik({
  url: 'tracking.tinvang.com.vn',
  siteId: 1,
  trackErrors: true
});

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    let _uid = Storage.local.get('uid');
    if (!_uid) {
      _uid = uid();
      Storage.local.set(UID, _uid);
    }
    ReactPiwik.push(['enableHeartBeatTimer']);
    ReactPiwik.push(['setUserId', _uid]);
    this.props.getSession();
    this.props.getProfile();
  }

  render() {
    return (
      <Router history={piwik.connectToHistory(history)}>
        <div className="app-container">
          <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
          <ErrorBoundary>
            <Header
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.props.isAdmin}
              isManager={this.props.isManager}
              isStaff={this.props.isStaff}
              currentLocale={this.props.currentLocale}
              onLocaleChange={this.props.setLocale}
              ribbonEnv={this.props.ribbonEnv}
              isInProduction={this.props.isInProduction}
              isSwaggerEnabled={this.props.isSwaggerEnabled}
            />
          </ErrorBoundary>
          <div id="home-content">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  isStaff: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.STAFF]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
