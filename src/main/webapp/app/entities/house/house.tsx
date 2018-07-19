import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Container, Table } from 'reactstrap';
import { getLandType, getSaleType, getStatusType } from 'app/shared/util/utils';
import { Translate, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Card, Icon, Tooltip } from 'antd';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';
import { getEntities, getStaffEntities, deleteEntity } from './house.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHouseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHouseState extends IPaginationBaseState {
  showDelete: any;
  houseId: any;
}

export class House extends React.Component<IHouseProps, IHouseState> {
  state: IHouseState = {
    showDelete: false,
    houseId: undefined,
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
    // this.props.getStaffEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  gotoEdit = id => {
    this.props.history.push(`${this.props.match.url}/${id}/edit`);
  };

  showDeleteConfirm = houseId => {
    this.setState({
      showDelete: true,
      houseId
    });
  };

  handleDeleteOk = id => {
    this.props.deleteEntity(id);
    this.setState({
      showDelete: false
    });
  };

  handleDeleteCancel = () => {
    this.setState({
      showDelete: false
    });
  };

  render() {
    const { houseList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              {this.props.loading || this.props.updating ? (
                <Loading />
              ) : (
                <Row>
                  <Card title="Danh sách tin đăng">
                    <div className="table-responsive">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th className="hand" onClick={this.sort('actionType')}>
                              <Translate contentKey="landexpApp.house.actionType">Action Type</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('landType')}>
                              <Translate contentKey="landexpApp.house.landType">Land Type</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('money')}>
                              <Translate contentKey="landexpApp.house.money">Money</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.house.city">City</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.house.district">District</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.house.statusType">Status Type</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.house.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
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
                              <td>{house.cityName ? <Link to={`city/${house.cityId}`}>{house.cityName}</Link> : ''}</td>
                              <td>{house.districtName ? <Link to={`district/${house.districtId}`}>{house.districtName}</Link> : ''}</td>
                              <td>{getSaleType(house.saleType)}</td>
                              <td>{getStatusType(house.statusType)}</td>
                              <td>{house.createByLogin}</td>
                              <td style={{ display: 'inline-block', width: 70 }}>
                                <div style={{ float: 'left', marginRight: 5 }} onClick={this.gotoEdit.bind(this, house.id)}>
                                  <Tooltip placement="top" title={'Sửa tin đăng'}>
                                    <Icon type="edit" />{' '}
                                  </Tooltip>
                                </div>
                                {!this.props.isManager ? (
                                  ''
                                ) : (
                                  <div style={{ float: 'left' }} onClick={this.showDeleteConfirm.bind(this, house.id)}>
                                    <Tooltip placement="top" title={'Xoá tin đăng'}>
                                      <Icon type="delete" />{' '}
                                    </Tooltip>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {!this.state.showDelete ? (
                      ''
                    ) : (
                      <Modal
                        title="Bạn có muốn xoá tin đăng này?"
                        visible={this.state.showDelete}
                        okText="Xóa"
                        okType="danger"
                        cancelText="Hủy"
                        onOk={this.handleDeleteOk.bind(this, this.state.houseId)}
                        onCancel={this.handleDeleteCancel}
                      >
                        <p>Hãy xác nhận lại thông tin trước khi thực hiện hành động xoá</p>
                      </Modal>
                    )}
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
  loading: house.loading,
  updating: house.updating,
  houseList: house.entities,
  totalItems: house.totalItems
});

const mapDispatchToProps = {
  getEntities,
  getStaffEntities,
  deleteEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(House);
