import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomePanelGuest extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <div className="row why-us">
        {/* <h2>Tại sao chọn chúng tôi</h2> */}
        <div className="col-md-4">
          <img src="/static/images/banner/1.png" />
          <p className="text-center">Trải nghiệm cách đăng tin hoàn toàn mới</p>
        </div>
        <div className="col-md-4">
          <img src="/static/images/banner/2.png" />
          <p className="text-center">
            Thay đổi cách bạn Mua, Bán Thuê, Cho thuê<br />Bất động sản
          </p>
        </div>
        <div className="col-md-4">
          <img src="/static/images/banner/3.png" />
          <p className="text-center">Giá trị trong từng tin đăng</p>
        </div>
        <div className="clearfix" />
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
)(HomePanelGuest);
