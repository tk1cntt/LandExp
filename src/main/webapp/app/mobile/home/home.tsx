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

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IHomeState extends IPaginationBaseState {
  search: string;
  showGrid: any;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    search: '',
    showGrid: true,
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    /*
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      // this.props.getSession();
      this.props.getHouses(queryStringMapping(parsed));
    }
    */
    this.props.getTopEntities();
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

    return <Row>Mobile website app</Row>;
  }
}

const mapStateToProps = storeState => ({
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
