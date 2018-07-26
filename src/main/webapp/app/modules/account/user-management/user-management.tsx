import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Col, Container, Badge } from 'reactstrap';
import {
  Translate,
  ICrudGetAllAction,
  ICrudPutAction,
  TextFormat,
  JhiPagination,
  getPaginationItemsNumber,
  getSortState,
  IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from 'antd';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getUsers, updateUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class UserManagement extends React.Component<IUserManagementProps, IPaginationBaseState> {
  state: IPaginationBaseState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getUsers();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortUsers()
    );
  };

  sortUsers() {
    this.getUsers();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortUsers());

  getUsers = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getUsers(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  toggleActive = user => () => {
    this.props.updateUser({
      ...user,
      activated: !user.activated
    });
  };

  render() {
    const { users, account, match, totalItems } = this.props;
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
                  <Card title="Danh sách người dùng">
                    <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
                      <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Create a new user</Translate>
                    </Link>
                    <Table style={{ marginTop: 20 }} responsive striped>
                      <thead>
                        <tr>
                          <th className="hand" onClick={this.sort('login')}>
                            <Translate contentKey="userManagement.login">Login</Translate>
                            <FontAwesomeIcon icon="sort" />
                          </th>
                          <th className="hand" onClick={this.sort('email')}>
                            <Translate contentKey="userManagement.email">Mobile number</Translate>
                            <FontAwesomeIcon icon="sort" />
                          </th>
                          <th />
                          <th>
                            <Translate contentKey="userManagement.profiles">Profiles</Translate>
                          </th>
                          <th className="hand" onClick={this.sort('createdDate')}>
                            <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                            <FontAwesomeIcon icon="sort" />
                          </th>
                          <th className="hand" onClick={this.sort('lastModifiedBy')}>
                            <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                            <FontAwesomeIcon icon="sort" />
                          </th>
                          <th className="hand" onClick={this.sort('lastModifiedDate')}>
                            <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                            <FontAwesomeIcon icon="sort" />
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => (
                          <tr id={user.login} key={`user-${i}`}>
                            <td>{user.login}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.activated ? (
                                <Button color="success" onClick={this.toggleActive(user)}>
                                  Activated
                                </Button>
                              ) : (
                                <Button color="danger" onClick={this.toggleActive(user)}>
                                  Deactivated
                                </Button>
                              )}
                            </td>
                            <td>
                              {user.authorities
                                ? user.authorities.map((authority, j) => (
                                    <div key={`user-auth-${i}-${j}`}>
                                      <Badge color="info">{authority}</Badge>
                                    </div>
                                  ))
                                : null}
                            </td>
                            <td>
                              <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                            </td>
                            <td>{user.lastModifiedBy}</td>
                            <td>
                              <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                            </td>
                            <td className="text-right">
                              <div className="btn-group flex-btn-group-container">
                                <Button tag={Link} to={`${match.url}/${user.login}/edit`} color="primary" size="sm">
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
                    <Row className="justify-content-center">
                      <JhiPagination
                        items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                        activePage={this.state.activePage}
                        onSelect={this.handlePagination}
                        maxButtons={3}
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

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  loading: storeState.userManagement.loading,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getUsers, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
