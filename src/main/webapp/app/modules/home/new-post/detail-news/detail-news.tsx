import './detail-news.css';

import * as React from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Row, Col, Alert} from 'reactstrap';

import {getSession} from 'app/shared/reducers/authentication';


export class DetailNews extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  state = {

  }

  render() {
    return (
      <div id="detail-news" className="">

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailNews);
