import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Container, Label, Table, Button } from 'reactstrap';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';
import { Translate, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Modal, Card, Icon, Tooltip } from 'antd';
const Option = Select.Option;

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
  parameters: any;
}

export class House extends React.Component<IHouseProps, IHouseState> {
  state: IHouseState = {
    showDelete: false,
    houseId: undefined,
    parameters: {},
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

  menuTypeClick = value => {
    const parameters = { actionType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  actionTypeForm() {
    return (
      <Select
        style={{ width: 140, marginRight: -2 }}
        value={this.state.parameters.actionType}
        placeholder="Hình thức"
        onChange={this.menuTypeClick}
      >
        <Option value="FOR_SELL">Bán</Option>
        <Option value="FOR_RENT">Cho thuê</Option>
      </Select>
    );
  }

  menuLandTypeClick = value => {
    const parameters = { landType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  landTypeForm() {
    return (
      <Select
        style={{ width: 180, marginRight: -2 }}
        value={this.state.parameters.landType}
        placeholder="Loại bất động sản"
        onChange={this.menuLandTypeClick}
      >
        <Option value="APARTMENT">{getLandType('APARTMENT')}</Option>
        <Option value="HOME">{getLandType('HOME')}</Option>
        <Option value="HOME_VILLA">{getLandType('HOME_VILLA')}</Option>
        <Option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</Option>
        <Option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</Option>
        <Option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</Option>
        <Option value="LAND_FARM">{getLandType('LAND_FARM')}</Option>
        <Option value="LAND_RESORT">{getLandType('LAND_RESORT')}</Option>
        <Option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</Option>
        <Option value="OFFICE">{getLandType('OFFICE')}</Option>
        <Option value="WAREHOUSES">{getLandType('WAREHOUSES')}</Option>
        <Option value="KIOSKS">{getLandType('KIOSKS')}</Option>
      </Select>
    );
  }

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
                    <Row style={{ marginBottom: 20 }}>
                      {this.actionTypeForm()}
                      {this.landTypeForm()}
                    </Row>
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
                                <Button onClick={this.gotoEdit.bind(this, house.id)} color="primary" size="sm">
                                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.edit">Edit</Translate>
                                  </span>
                                </Button>
                                {this.props.isManager && house.statusType !== 'PAID' ? (
                                  <Button onClick={this.showDeleteConfirm.bind(this, house.id)} color="danger" size="sm">
                                    <FontAwesomeIcon icon="trash" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.delete">Delete</Translate>
                                    </span>
                                  </Button>
                                ) : (
                                  ''
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {this.state.showDelete ? (
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
                    ) : (
                      ''
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
