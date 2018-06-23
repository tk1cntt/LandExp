import './home.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import NewPost from './new-post/new-post';

import GridPreview from './grid-preview/grid-preview';
import { getSession } from 'app/shared/reducers/authentication';
import Title from './title/title';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  state = {
    title: {
      time: 'Thứ 5, ngày 31 tháng 05 năm 2018'
    }
  };

  render() {
    const { account } = this.props;
    return (
      <div id="home-content">
        <div className="container">
          <div className="featured-posts">
            <Title title={ this.state.title } />
            <GridPreview />

            <NewPost />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
