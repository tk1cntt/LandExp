import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Container, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './land-project.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILandProjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ILandProjectState = IPaginationBaseState;

export class LandProject extends React.Component<ILandProjectProps, ILandProjectState> {
  state: ILandProjectState = {
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
    const { landProjectList, match, totalItems } = this.props;
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
                  <Card title="Danh sách dự án">
                    <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                      <FontAwesomeIcon icon="plus" />&nbsp;
                      <Translate contentKey="landexpApp.landProject.home.createLabel">Create new Land Project</Translate>
                    </Link>
                    <div className="table-responsive">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th className="hand" onClick={this.sort('name')}>
                              <Translate contentKey="landexpApp.landProject.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('image')}>
                              <Translate contentKey="landexpApp.landProject.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.landProject.city">City</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.landProject.district">District</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.landProject.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {landProjectList.map((landProject, i) => (
                            <tr key={`entity-${i}`}>
                              <td>{landProject.name}</td>
                              <td>
                                {landProject.image ? (
                                  <div>
                                    <a onClick={openFile(landProject.imageContentType, landProject.image)}>
                                      <img
                                        src={`data:${landProject.imageContentType};base64,${landProject.image}`}
                                        style={{ maxHeight: '30px' }}
                                      />
                                      &nbsp;
                                    </a>
                                    <span>
                                      {landProject.imageContentType}, {byteSize(landProject.image)}
                                    </span>
                                  </div>
                                ) : null}
                              </td>
                              <td>{landProject.cityName ? <Link to={`city/${landProject.cityId}`}>{landProject.cityName}</Link> : ''}</td>
                              <td>
                                {landProject.districtName ? (
                                  <Link to={`district/${landProject.districtId}`}>{landProject.districtName}</Link>
                                ) : (
                                  ''
                                )}
                              </td>
                              <td>{landProject.createByLogin ? landProject.createByLogin : ''}</td>
                              <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                  <Button tag={Link} to={`${match.url}/${landProject.id}`} color="info" size="sm">
                                    <FontAwesomeIcon icon="eye" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.view">View</Translate>
                                    </span>
                                  </Button>
                                  <Button tag={Link} to={`${match.url}/${landProject.id}/edit`} color="primary" size="sm">
                                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.edit">Edit</Translate>
                                    </span>
                                  </Button>
                                  <Button tag={Link} to={`${match.url}/${landProject.id}/delete`} color="danger" size="sm">
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
                        maxButtons={3}
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

const mapStateToProps = ({ landProject }: IRootState) => ({
  landProjectList: landProject.entities,
  loading: landProject.loading,
  totalItems: landProject.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandProject);
