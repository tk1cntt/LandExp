import './app.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

import './style.css';
/* tslint:disable-next-line */
import 'antd/dist/antd.css';
/* tslint:disable-next-line */
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.getSession();
    this.props.getProfile();
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
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
          <div id="home-content">
            <AppRoutes />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
