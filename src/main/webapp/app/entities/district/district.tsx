import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Container, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Icon } from 'antd';
import Loading from 'app/shared/layout/loading/loading';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './district.reducer';
// tslint:disable-next-line:no-unused-variable
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IDistrictProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDistrictState = IPaginationBaseState;

export class District extends React.Component<IDistrictProps, IDistrictState> {
  state: IDistrictState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

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
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { districtList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Col md="12">
            {this.props.loading ? (
              <Loading />
            ) : (
              <Card title="Danh sách quận huyện">
                <div className="table-responsive">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={this.sort('name')}>
                          <Translate contentKey="landexpApp.district.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.district.region">Region</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.district.city">City</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('enabled')}>
                          <Translate contentKey="landexpApp.district.enabled">Enabled</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {districtList.map((district, i) => (
                        <tr key={`entity-${i}`}>
                          <td>{district.name}</td>
                          <td>{district.regionId ? <Link to={`region/${district.regionId}`}>{district.regionName}</Link> : ''}</td>
                          <td>{district.cityId ? <Link to={`city/${district.cityId}`}>{district.cityName}</Link> : ''}</td>
                          <td>
                            {district.enabled ? (
                              <Icon type="check-square" style={{ color: 'green' }} />
                            ) : (
                              <Icon type="close-square" style={{ color: 'red' }} />
                            )}
                          </td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`${match.url}/${district.id}/edit`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit">Edit</Translate>
                                </span>
                              </Button>
                            </div>
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
                    maxButtons={3}
                  />
                </Row>
              </Card>
            )}
          </Col>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ district }: IRootState) => ({
  districtList: district.entities,
  loading: district.loading,
  totalItems: district.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);
