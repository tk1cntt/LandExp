import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './potential-customer.reducer';
import { IPotentialCustomer } from 'app/shared/model/potential-customer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IPotentialCustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPotentialCustomerState extends IPaginationBaseState {
  search: string;
}

export class PotentialCustomer extends React.Component<IPotentialCustomerProps, IPotentialCustomerState> {
  state: IPotentialCustomerState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
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
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { potentialCustomerList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Col md="12">
            {this.props.loading ? (
              <div className="justify-content-center">
                <Spin tip="Đang cập nhật dữ liệu..." />
              </div>
            ) : (
              <>
                <h2 id="potential-customer-heading">
                  <Translate contentKey="landexpApp.potentialCustomer.home.title">Potential Customers</Translate>
                </h2>
                <div className="table-responsive">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={this.sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('level')}>
                          <Translate contentKey="landexpApp.potentialCustomer.level">Level</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('description')}>
                          <Translate contentKey="landexpApp.potentialCustomer.description">Description</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('createAt')}>
                          <Translate contentKey="landexpApp.potentialCustomer.createAt">Create At</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('updateAt')}>
                          <Translate contentKey="landexpApp.potentialCustomer.updateAt">Update At</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.potentialCustomer.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.potentialCustomer.createBy">Create By</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.potentialCustomer.updateBy">Update By</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {potentialCustomerList.map((potentialCustomer, i) => (
                        <tr key={`entity-${i}`}>
                          <td>
                            <Button tag={Link} to={`${match.url}/${potentialCustomer.id}`} color="link" size="sm">
                              {potentialCustomer.id}
                            </Button>
                          </td>
                          <td>{potentialCustomer.level}</td>
                          <td>{potentialCustomer.description}</td>
                          <td>
                            <TextFormat type="date" value={potentialCustomer.createAt} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                          <td>
                            <TextFormat type="date" value={potentialCustomer.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                          <td>{potentialCustomer.customerLogin ? potentialCustomer.customerLogin : ''}</td>
                          <td>{potentialCustomer.createByLogin ? potentialCustomer.createByLogin : ''}</td>
                          <td>{potentialCustomer.updateByLogin ? potentialCustomer.updateByLogin : ''}</td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`${match.url}/${potentialCustomer.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.view">View</Translate>
                                </span>
                              </Button>
                              <Button tag={Link} to={`${match.url}/${potentialCustomer.id}/edit`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit">Edit</Translate>
                                </span>
                              </Button>
                              <Button tag={Link} to={`${match.url}/${potentialCustomer.id}/delete`} color="danger" size="sm">
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.delete">Delete</Translate>
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
                    maxButtons={5}
                  />
                </Row>
              </>
            )}
          </Col>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ potentialCustomer }: IRootState) => ({
  potentialCustomerList: potentialCustomer.entities,
  loading: potentialCustomer.loading,
  totalItems: potentialCustomer.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PotentialCustomer);
