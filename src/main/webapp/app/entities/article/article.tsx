import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Container, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './article.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IArticleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IArticleState = IPaginationBaseState;

export class Article extends React.Component<IArticleProps, IArticleState> {
  state: IArticleState = {
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
    const { articleList, match, totalItems } = this.props;
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
                  <Card title="Danh sách tỉnh thành">
                    <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                      <FontAwesomeIcon icon="plus" />&nbsp;
                      <Translate contentKey="landexpApp.article.home.createLabel">Create new Article</Translate>
                    </Link>
                    <div className="table-responsive">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th className="hand" onClick={this.sort('title')}>
                              <Translate contentKey="landexpApp.article.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('statusType')}>
                              <Translate contentKey="landexpApp.article.statusType">Status Type</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('createAt')}>
                              <Translate contentKey="landexpApp.article.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.article.category">Category</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.article.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {articleList.map((article, i) => (
                            <tr key={`entity-${i}`}>
                              <td>{article.title}</td>
                              <td>{article.statusType === 'OPEN' ? 'Chờ duyệt' : 'Đã duyệt'}</td>
                              <td>
                                <TextFormat type="date" value={article.createAt} format={APP_LOCAL_DATE_FORMAT} />
                              </td>
                              <td>
                                {article.categoryName ? <Link to={`category/${article.categoryId}`}>{article.categoryName}</Link> : ''}
                              </td>
                              <td>{article.createByLogin ? article.createByLogin : ''}</td>
                              <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                  <Button tag={Link} to={`${match.url}/${article.id}`} color="info" size="sm">
                                    <FontAwesomeIcon icon="eye" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.view">View</Translate>
                                    </span>
                                  </Button>
                                  <Button tag={Link} to={`${match.url}/${article.id}/edit`} color="primary" size="sm">
                                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.edit">Edit</Translate>
                                    </span>
                                  </Button>
                                  <Button tag={Link} to={`${match.url}/${article.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ article }: IRootState) => ({
  articleList: article.entities,
  loading: article.loading,
  totalItems: article.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
