import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
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
import { getSearchEntities, getEntities } from './house-photo.reducer';
import { IHousePhoto } from 'app/shared/model/house-photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHousePhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHousePhotoState extends IPaginationBaseState {
  search: string;
}

export class HousePhoto extends React.Component<IHousePhotoProps, IHousePhotoState> {
  state: IHousePhotoState = {
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
    const { housePhotoList, match, totalItems } = this.props;
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
                <h2 id="house-photo-heading">
                  <Translate contentKey="landexpApp.housePhoto.home.title">House Photos</Translate>
                </h2>
                <div className="table-responsive">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={this.sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('image')}>
                          <Translate contentKey="landexpApp.housePhoto.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('enabled')}>
                          <Translate contentKey="landexpApp.housePhoto.enabled">Enabled</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={this.sort('createAt')}>
                          <Translate contentKey="landexpApp.housePhoto.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.housePhoto.house">House</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.housePhoto.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.housePhoto.updateBy">Update By</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {housePhotoList.map((housePhoto, i) => (
                        <tr key={`entity-${i}`}>
                          <td>
                            <Button tag={Link} to={`${match.url}/${housePhoto.id}`} color="link" size="sm">
                              {housePhoto.id}
                            </Button>
                          </td>
                          <td>
                            {housePhoto.image ? (
                              <div>
                                <a onClick={openFile(housePhoto.imageContentType, housePhoto.image)}>
                                  <img
                                    src={`data:${housePhoto.imageContentType};base64,${housePhoto.image}`}
                                    style={{ maxHeight: '30px' }}
                                  />
                                  &nbsp;
                                </a>
                                <span>
                                  {housePhoto.imageContentType}, {byteSize(housePhoto.image)}
                                </span>
                              </div>
                            ) : null}
                          </td>
                          <td>{housePhoto.enabled ? 'true' : 'false'}</td>
                          <td>
                            <TextFormat type="date" value={housePhoto.createAt} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                          <td>{housePhoto.houseId ? <Link to={`house/${housePhoto.houseId}`}>{housePhoto.houseId}</Link> : ''}</td>
                          <td>{housePhoto.createByLogin ? housePhoto.createByLogin : ''}</td>
                          <td>{housePhoto.updateByLogin ? housePhoto.updateByLogin : ''}</td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`${match.url}/${housePhoto.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.view">View</Translate>
                                </span>
                              </Button>
                              <Button tag={Link} to={`${match.url}/${housePhoto.id}/edit`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit">Edit</Translate>
                                </span>
                              </Button>
                              <Button tag={Link} to={`${match.url}/${housePhoto.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ housePhoto }: IRootState) => ({
  housePhotoList: housePhoto.entities,
  loading: housePhoto.loading,
  totalItems: housePhoto.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HousePhoto);
