import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Container, Table } from 'reactstrap';
import { getLandType, getSaleType, getStatusType, encodeId, encodePayment } from 'app/shared/util/utils';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getOwnerEntities } from 'app/entities/house/house.reducer';
// tslint:disable-next-line:no-unused-variable
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHouseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export interface IHouseState extends IPaginationBaseState {
  search: string;
}

export class House extends React.Component<IHouseProps, IHouseState> {
  state: IHouseState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getOwnerEntities();
  }

  clear = () => {
    this.props.getOwnerEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getOwnerEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getOwnerEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getOwnerEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { houseList, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              {this.props.loading ? (
                <Loading />
              ) : (
                  <Row>
                    <Card title="Danh sách tin đăng">
                      <div>
                        <Table responsive striped>
                          <thead>
                            <tr>
                              <th>
                                <Translate contentKey="landexpApp.house.actionType">Action Type</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.landType">Land Type</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.money">Money</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.discount">Discount</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.city">City</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.district">District</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate>
                              </th>
                              <th>
                                <Translate contentKey="landexpApp.house.statusType">Status Type</Translate>
                              </th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {houseList.map((house, i) => (
                              <tr key={`entity-${i}`}>
                                <td>{house.actionType === 'FOR_SELL' ? 'Bán' : 'Cho thuê'}</td>
                                <td>{getLandType(house.landType)}</td>
                                <td>{new Intl.NumberFormat().format(house.money)} VNĐ</td>
                                <td>{new Intl.NumberFormat().format(house.discount)} VNĐ</td>
                                <td>{house.cityName}</td>
                                <td>{house.districtName}</td>
                                <td>{getSaleType(house.saleType)}</td>
                                <td>{getStatusType(house.statusType)}</td>
                                <td className="text-right">
                                  <Button tag={Link} to={`/bat-dong-san/${encodeId(house.id)}/xem-truoc-tin-dang`} color="info" size="sm">
                                    <FontAwesomeIcon icon="eye" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.view">View</Translate>
                                    </span>
                                  </Button>
                                  {house.statusType !== 'PAID' ? (
                                    <Button tag={Link} to={`/tai-khoan/sua-tin-dang/${encodeId(house.id)}`} color="primary" size="sm">
                                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                                      <span className="d-none d-md-inline">
                                        <Translate contentKey="entity.action.edit">Edit</Translate>
                                      </span>
                                    </Button>
                                  ) : ''}
                                  {house.statusType === 'PENDING' ? (
                                    <Button tag={Link} to={`/tai-khoan/thanh-toan/${encodePayment(house.id)}`} color="warning" size="sm">
                                      <FontAwesomeIcon icon="coffee" />{' '}
                                      <span className="d-none d-md-inline">
                                        <Translate contentKey="entity.action.pay">Pay</Translate>
                                      </span>
                                    </Button>
                                  ) : ''}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      <Row className="justify-content-center">
                        <JhiPagination
                          items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                          activePage={this.state.activePage}
                          onSelect={this.handlePagination}
                          maxButtons={5}
                        />
                      </Row>
                    </Card>
                  </Row>
                )}
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ house, authentication }: IRootState) => ({
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  houseList: house.entities,
  loading: house.loading,
  totalItems: house.totalItems
});

const mapDispatchToProps = {
  getOwnerEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(House);
