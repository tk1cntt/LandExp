import './home.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';

import SearchPage from 'app/shared/layout/search/search-menu';
import HomeLike from './home-like';
import HomeHouse from './home-house';
import HomeFollow from './home-follow';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomePanelUser extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <div className="acc-panel">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-md-4">
                <HomeFollow />
              </div>
              <div className="col-md-4">
                <HomeLike />
              </div>
              <div className="col-md-4">
                <HomeHouse />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelUser);
