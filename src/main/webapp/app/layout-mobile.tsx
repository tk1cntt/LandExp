import 'react-toastify/dist/ReactToastify.css';
import './app-mobile.css';

import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes-mobile';

import './style-mobile.css';
/* tslint:disable-next-line */
import 'react-image-gallery/styles/css/image-gallery.css';

export interface IAppProps extends StateProps, DispatchProps {}

export class AppMobile extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMobile);
