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
                    <Table style={{ marginTop: 20 }} responsive striped>
                      <thead>
                        <tr>
                          <th>
                            <Translate contentKey="landexpApp.landProject.name">Name</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.landProject.image">Image</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.landProject.city">City</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.landProject.district">District</Translate>
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
                            <td>{landProject.cityName}</td>
                            <td>{landProject.districtName}</td>
                            <td className="text-right">
                              <div className="btn-group flex-btn-group-container">
                                <Button tag={Link} to={`${match.url}/${landProject.id}/edit`} color="primary" size="sm">
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
