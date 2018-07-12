import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomeLike extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            TIN YÊU THÍCH
            <span className="right-info">
              <span className="ring-icon">
                <span className="badge">2</span>
              </span>
              <span className="chat-icon">
                <span className="badge">5</span>
              </span>
            </span>
          </h3>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            Tổng số<span>300</span>
          </li>
          <li className="list-group-item">
            Đã bán<span>50</span>
          </li>
          <li className="list-group-item">
            Tiềm năng<span>20</span>
          </li>
          <li className="list-group-item">
            Thay đổi giá<span>10</span>
          </li>
        </ul>
        <div className="text-right">
          <a href="#">QUẢN LÝ</a>
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
)(HomeLike);
