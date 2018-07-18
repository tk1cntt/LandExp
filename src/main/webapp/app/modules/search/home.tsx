import './home.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IPaginationBaseState, getSortState } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getHouses, getEntities, getTopEntities, getOwnerEntities, getEntity } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import * as qs from 'query-string';
import Loading from 'app/shared/layout/loading/loading';

import { queryStringMapping } from 'app/shared/util/utils';
import SearchPage from 'app/shared/layout/search/search-menu';
import HomeGrid from '../home/home-grid';
import HomeList from '../home/home-list';
import HomePanelGuest from './home-panel-guest';
import HomePanelUser from './home-panel-user';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IHomeState extends IPaginationBaseState {
  parameters: any;
  showGrid: any;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    parameters: {},
    showGrid: true,
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      this.props.getHouses(queryStringMapping(parsed));
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.location !== prevProps.location) {
      const parsed = qs.parse(this.props.location.search);
      this.props.getHouses(queryStringMapping(parsed));
    }
  }

  showForm(value) {
    if (!value) {
      this.props.getEntity(this.props.houseList[0].id);
      this.props.getImageOfHouse(this.props.houseList[0].id);
    }
    this.setState({
      showGrid: value
    });
  }

  render() {
    const from = (this.state.activePage - 1) * this.state.itemsPerPage + 1;
    const to = this.state.activePage * this.state.itemsPerPage;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        {this.props.isAuthenticated ? <HomePanelUser /> : <HomePanelGuest />}
        <div className="container">
          {this.props.loading ? (
            <Loading />
          ) : (
            <>
              <div className="row lastest-posts">
                <h2>
                  Tin mới đăng
                  <span>
                    Hiển thị {from} - {this.props.totalItems < 20 ? this.props.totalItems : to} trong {this.props.totalItems} Bất động sản
                  </span>
                  <div className="toolbox">
                    <ul role="tablist">
                      <li
                        className={!this.state.showGrid ? 'listview-button active' : 'listview-button'}
                        onClick={this.showForm.bind(this, false)}
                      >
                        <a aria-controls="home" role="tab" data-toggle="tab" />
                      </li>
                      <li
                        className={this.state.showGrid ? 'gridview-button active' : 'gridview-button'}
                        onClick={this.showForm.bind(this, true)}
                      >
                        <a aria-controls="home" role="tab" data-toggle="tab" />
                      </li>
                    </ul>
                  </div>
                </h2>
                <div className="row">
                  <div className="tab-content">
                    {this.state.showGrid ? <HomeGrid houses={this.props.houseList} /> : <HomeList houses={this.props.houseList} />}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  houseList: storeState.house.entities,
  totalItems: storeState.house.totalItems,
  loading: storeState.house.loading
});

const mapDispatchToProps = { getSession, getHouses, getEntities, getTopEntities, getOwnerEntities, getEntity, getImageOfHouse };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
