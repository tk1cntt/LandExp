import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Container, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Icon } from 'antd';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './category.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICategoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICategoryState = IPaginationBaseState;

export class Category extends React.Component<ICategoryProps, ICategoryState> {
  state: ICategoryState = {
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
    const { categoryList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              <Row>
                {this.props.loading ? (
                  <Loading />
                ) : (
                  <Card title="Danh mục tin tức">
                    <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                      <FontAwesomeIcon icon="plus" />&nbsp;
                      <Translate contentKey="landexpApp.category.home.createLabel">Create new Category</Translate>
                    </Link>
                    <Table style={{ marginTop: 20 }} responsive striped>
                      <thead>
                        <tr>
                          <th>
                            <Translate contentKey="landexpApp.category.name">Name</Translate>
                          </th>
                          <th>Danh mục tin tức</th>
                          <th>Thứ tự hiển thị</th>
                          <th>
                            <Translate contentKey="landexpApp.category.createAt">Create At</Translate>
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList.map((category, i) => (
                          <tr key={`entity-${i}`}>
                            <td>{category.name}</td>
                            <td>
                              {category.enabled ? (
                                <Icon type="check-square" style={{ color: 'green' }} />
                              ) : (
                                <Icon type="close-square" style={{ color: 'red' }} />
                              )}
                            </td>
                            <td>{category.enabled ? category.index : 'Không hiển thị'}</td>
                            <td>
                              <TextFormat type="date" value={category.createAt} format={APP_LOCAL_DATE_FORMAT} />
                            </td>
                            <td className="text-right">
                              <div className="btn-group flex-btn-group-container">
                                <Button tag={Link} to={`${match.url}/${category.id}/edit`} color="primary" size="sm">
                                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.edit">Edit</Translate>
                                  </span>
                                </Button>
                                <Button tag={Link} to={`${match.url}/${category.id}/delete`} color="danger" size="sm">
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
                    <Row className="justify-content-center">
                      <JhiPagination
                        items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                        activePage={this.state.activePage}
                        onSelect={this.handlePagination}
                        maxButtons={5}
                      />
                    </Row>
                  </Card>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ category }: IRootState) => ({
  categoryList: category.entities,
  loading: category.loading,
  totalItems: category.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
