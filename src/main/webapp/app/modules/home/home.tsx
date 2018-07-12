import './home.css';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, IPaginationBaseState, getSortState } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getHouses, getEntities, getOwnerEntities } from 'app/entities/house/house.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import * as qs from 'query-string';
import { Spin } from 'antd';

import { queryStringMapping } from 'app/shared/util/utils';
import SearchPage from 'app/shared/layout/search/search-menu';
import HomeGrid from './home-grid';
import HomeList from './home-list';
import HomeSearchBox from './home-searchbox';
import HomeNewsBox from './home-newsbox';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IHomeState extends IPaginationBaseState {
  search: string;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      // this.props.getSession();
      this.props.getHouses(queryStringMapping(parsed));
    }
  }
  render() {
    return (
      <Row>
        <HomeSearchBox />
        <div className="container">
          <HomeNewsBox />
          <Spin spinning={this.props.loading} tip="Đang cập nhật dữ liệu...">
            <div className="row lastest-posts">
              <h2>
                Tin mới đăng<span>
                  Hiển thị 1 - {} trong {this.props.totalItems} Bất động sản
                </span>
                <div className="toolbox">
                  <label htmlFor="sortby">Sắp xếp: </label>
                  <select name="sortby" id="sortby">
                    <option>Ngày đăng mới nhất</option>
                    <option>Giá từ thấp đến cao</option>
                    <option>Giá từ cao đến thấp</option>
                  </select>
                  <ul role="tablist">
                    <li className="listview-button">
                      <a href="#list" aria-controls="home" role="tab" data-toggle="tab" />
                    </li>
                    <li className="gridview-button active">
                      <a href="#grid" aria-controls="home" role="tab" data-toggle="tab" />
                    </li>
                  </ul>
                </div>
              </h2>
              <div className="row">
                <div className="tab-content">
                  <HomeList houses={this.props.houseList} />
                  <HomeGrid houses={this.props.houseList} />
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  houseList: storeState.house.entities,
  totalItems: storeState.house.totalItems,
  loading: storeState.house.loading
});

const mapDispatchToProps = { getSession, getHouses, getEntities, getOwnerEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
