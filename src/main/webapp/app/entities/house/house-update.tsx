import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, Card } from 'antd';
const TabPane = Tabs.TabPane;

import { IRootState } from 'app/shared/reducers';

import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { getEntities as getWards } from 'app/entities/ward/ward.reducer';
import { getEntities as getLandProjects } from 'app/entities/land-project/land-project.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './house.reducer';
// tslint:disable-next-line:no-unused-variable
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHouseUpdateState {
  isNew: boolean;
  cityId: number;
  districtId: number;
  wardId: number;
  projectId: number;
  createById: number;
  updateById: number;
}

export class HouseUpdate extends React.Component<IHouseUpdateProps, IHouseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cityId: 0,
      districtId: 0,
      wardId: 0,
      projectId: 0,
      createById: 0,
      updateById: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCities();
    this.props.getDistricts();
    this.props.getWards();
    this.props.getLandProjects();
    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { houseEntity } = this.props;
      const entity = {
        ...houseEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/quan-ly/tin-dang');
  };

  cityUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        cityId: -1
      });
    } else {
      for (const i in this.props.cities) {
        if (name === this.props.cities[i].name.toString()) {
          this.setState({
            cityId: this.props.cities[i].id
          });
        }
      }
    }
  };

  districtUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        districtId: -1
      });
    } else {
      for (const i in this.props.districts) {
        if (name === this.props.districts[i].name.toString()) {
          this.setState({
            districtId: this.props.districts[i].id
          });
        }
      }
    }
  };

  wardUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        wardId: -1
      });
    } else {
      for (const i in this.props.wards) {
        if (name === this.props.wards[i].name.toString()) {
          this.setState({
            wardId: this.props.wards[i].id
          });
        }
      }
    }
  };

  projectUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        projectId: -1
      });
    } else {
      for (const i in this.props.landProjects) {
        if (name === this.props.landProjects[i].name.toString()) {
          this.setState({
            projectId: this.props.landProjects[i].id
          });
        }
      }
    }
  };

  createByUpdate = element => {
    const login = element.target.value.toString();
    if (login === '') {
      this.setState({
        createById: -1
      });
    } else {
      for (const i in this.props.users) {
        if (login === this.props.users[i].login.toString()) {
          this.setState({
            createById: this.props.users[i].id
          });
        }
      }
    }
  };

  updateByUpdate = element => {
    const login = element.target.value.toString();
    if (login === '') {
      this.setState({
        updateById: -1
      });
    } else {
      for (const i in this.props.users) {
        if (login === this.props.users[i].login.toString()) {
          this.setState({
            updateById: this.props.users[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { houseEntity, cities, districts, wards, landProjects, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { avatar, avatarContentType } = houseEntity;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              {loading ? (
                <Loading />
              ) : (
                <Row>
                  <Card title="Thông tin chi tiết về ngôi nhà">
                    <AvForm model={isNew ? {} : houseEntity} className="home-edit-content" onSubmit={this.saveEntity}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Đặc điểm" key="1">
                          <Col md="6">
                            <AvGroup>
                              <Label id="actionTypeLabel">
                                <Translate contentKey="landexpApp.house.actionType">Action Type</Translate>
                              </Label>
                              <AvInput
                                id="house-actionType"
                                type="select"
                                className="form-control"
                                name="actionType"
                                value={(!isNew && houseEntity.actionType) || 'FOR_SELL'}
                              >
                                <option value="FOR_SELL">{getActionType('FOR_SELL')}</option>
                                <option value="FOR_RENT">{getActionType('FOR_RENT')}</option>
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="landTypeLabel">
                                <Translate contentKey="landexpApp.house.landType">Land Type</Translate>
                              </Label>
                              <AvInput
                                id="house-landType"
                                type="select"
                                className="form-control"
                                name="landType"
                                value={(!isNew && houseEntity.landType) || 'APARTMENT'}
                              >
                                <option value="APARTMENT">{getLandType('APARTMENT')}</option>
                                <option value="PEN_HOUSE">{getLandType('PEN_HOUSE')}</option>
                                <option value="HOME">{getLandType('HOME')}</option>
                                <option value="HOME_VILLA">{getLandType('HOME_VILLA')}</option>
                                <option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</option>
                                <option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</option>
                                <option value="OFFICE">{getLandType('OFFICE')}</option>
                                <option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</option>
                                <option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</option>
                                <option value="LAND_FARM">{getLandType('LAND_FARM')}</option>
                                <option value="LAND_RESORT">{getLandType('LAND_RESORT')}</option>
                                <option value="WAREHOUSES">{getLandType('WAREHOUSES')}</option>
                                <option value="KIOSKS">{getLandType('KIOSKS')}</option>
                                <option value="OTHER">{getLandType('OTHER')}</option>
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label for="project.name">
                                <Translate contentKey="landexpApp.house.project">Project</Translate>
                              </Label>
                              <AvInput
                                id="house-project"
                                type="select"
                                className="form-control"
                                name="projectId"
                                value={!isNew && houseEntity.projectId}
                                onChange={this.projectUpdate}
                              >
                                <option value="" key="0" />
                                {landProjects
                                  ? landProjects.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.name}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="addressLabel" for="address">
                                <Translate contentKey="landexpApp.house.address">Address</Translate>
                              </Label>
                              <AvField id="house-address" type="text" name="address" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="acreageLabel" for="acreage">
                                <Translate contentKey="landexpApp.house.acreage">Acreage</Translate>
                              </Label>
                              <AvField id="house-acreage" type="number" className="form-control" name="acreage" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="acreageStreetSideLabel" for="acreageStreetSide">
                                <Translate contentKey="landexpApp.house.acreageStreetSide">Acreage Street Side</Translate>
                              </Label>
                              <AvField id="house-acreageStreetSide" type="number" className="form-control" name="acreageStreetSide" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="directionLabel">
                                <Translate contentKey="landexpApp.house.direction">Direction</Translate>
                              </Label>
                              <AvInput
                                id="house-direction"
                                type="select"
                                className="form-control"
                                name="direction"
                                value={(!isNew && houseEntity.direction) || 'NORTH'}
                              >
                                <option value="NORTH">{getDirection('NORTH')}</option>
                                <option value="SOUTH">{getDirection('SOUTH')}</option>
                                <option value="EAST">{getDirection('EAST')}</option>
                                <option value="WEST">{getDirection('WEST')}</option>
                                <option value="EAST_NORTH">{getDirection('EAST_NORTH')}</option>
                                <option value="WEST_NORTH">{getDirection('WEST_NORTH')}</option>
                                <option value="EAST_SOUTH">{getDirection('EAST_SOUTH')}</option>
                                <option value="WEST_SOUTH">{getDirection('WEST_SOUTH')}</option>
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="directionBalconyLabel">
                                <Translate contentKey="landexpApp.house.directionBalcony">Direction Balcony</Translate>
                              </Label>
                              <AvInput
                                id="house-directionBalcony"
                                type="select"
                                className="form-control"
                                name="directionBalcony"
                                value={(!isNew && houseEntity.directionBalcony) || 'NORTH'}
                              >
                                <option value="NORTH">{getDirection('NORTH')}</option>
                                <option value="SOUTH">{getDirection('SOUTH')}</option>
                                <option value="EAST">{getDirection('EAST')}</option>
                                <option value="WEST">{getDirection('WEST')}</option>
                                <option value="EAST_NORTH">{getDirection('EAST_NORTH')}</option>
                                <option value="WEST_NORTH">{getDirection('WEST_NORTH')}</option>
                                <option value="EAST_SOUTH">{getDirection('EAST_SOUTH')}</option>
                                <option value="WEST_SOUTH">{getDirection('WEST_SOUTH')}</option>
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="floorLabel" for="floor">
                                <Translate contentKey="landexpApp.house.floor">Floor</Translate>
                              </Label>
                              <AvField id="house-floor" type="text" name="floor" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="numberOfFloorLabel" for="numberOfFloor">
                                <Translate contentKey="landexpApp.house.numberOfFloor">Number Of Floor</Translate>
                              </Label>
                              <AvField id="house-numberOfFloor" type="number" className="form-control" name="numberOfFloor" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="bathRoomLabel" for="bathRoom">
                                <Translate contentKey="landexpApp.house.bathRoom">Bath Room</Translate>
                              </Label>
                              <AvField id="house-bathRoom" type="number" className="form-control" name="bathRoom" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="bedRoomLabel" for="bedRoom">
                                <Translate contentKey="landexpApp.house.bedRoom">Bed Room</Translate>
                              </Label>
                              <AvField id="house-bedRoom" type="number" className="form-control" name="bedRoom" />
                            </AvGroup>
                          </Col>
                          <Col md="12">
                            <AvGroup>
                              <Label id="parkingLabel" check>
                                <AvInput id="house-parking" type="checkbox" className="form-control" name="parking" />
                                <Translate contentKey="landexpApp.house.parking">Parking</Translate>
                              </Label>
                            </AvGroup>
                          </Col>
                          <Col md="12">
                            <AvGroup>
                              <Label id="summaryLabel" for="summary">
                                <Translate contentKey="landexpApp.house.summary">Summary</Translate>
                              </Label>
                              <AvField id="house-summary" type="text" name="summary" />
                            </AvGroup>
                          </Col>
                        </TabPane>
                        <TabPane tab="Giá" key="2">
                          <Col md="6">
                            <AvGroup>
                              <Label id="moneyLabel" for="money">
                                <Translate contentKey="landexpApp.house.money">Money</Translate>
                              </Label>
                              <AvField id="house-money" type="number" className="form-control" name="money" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="discountLabel" for="discount">
                                <Translate contentKey="landexpApp.house.discount">Discount</Translate>
                              </Label>
                              <AvField id="house-discount" type="number" className="form-control" name="discount" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="saleTypeLabel">
                                <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate>
                              </Label>
                              <AvInput
                                id="house-saleType"
                                type="select"
                                className="form-control"
                                name="saleType"
                                value={(!isNew && houseEntity.saleType) || 'SALE_BY_MYSELF'}
                              >
                                <option value="SALE_BY_MYSELF">{getSaleType('SALE_BY_MYSELF')}</option>
                                <option value="SALE_BY_MYSELF_VIP">{getSaleType('SALE_BY_MYSELF_VIP')}</option>
                                <option value="SALE_SUPPORT">{getSaleType('SALE_SUPPORT')}</option>
                                <option value="SALE_SUPPORT_VIP">{getSaleType('SALE_SUPPORT_VIP')}</option>
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="presentLabel">
                                <Translate contentKey="landexpApp.house.present">Present</Translate>
                              </Label>
                              <AvInput
                                id="house-present"
                                type="select"
                                className="form-control"
                                name="present"
                                value={(!isNew && houseEntity.present) || 'NONE'}
                              >
                                <option value="NONE">{getPresent('NONE')}</option>
                                <option value="BASIC_FURNITURE">{getPresent('BASIC_FURNITURE')}</option>
                                <option value="FULL_FURNITURE">{getPresent('FULL_FURNITURE')}</option>
                                <option value="DISCOUNT_PRICE">{getPresent('DISCOUNT_PRICE')}</option>
                                <option value="SUPPORT_EXHIBIT">{getPresent('SUPPORT_EXHIBIT')}</option>
                                <option value="SUPPORT_FEE">{getPresent('SUPPORT_FEE')}</option>
                                <option value="HAVE_PRESENT">{getPresent('HAVE_PRESENT')}</option>
                              </AvInput>
                            </AvGroup>
                          </Col>
                        </TabPane>
                        <TabPane tab="Địa chỉ" key="3">
                          Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Hình ảnh" key="4">
                          <Col md="12">
                            <AvGroup>
                              <Label id="avatarLabel" for="avatar">
                                <Translate contentKey="landexpApp.house.avatar">Avatar</Translate>
                              </Label>
                              <br />
                              {avatar ? (
                                <div>
                                  <a onClick={openFile(avatarContentType, avatar)}>
                                    <img src={`data:${avatarContentType};base64,${avatar}`} style={{ maxHeight: '100px' }} />
                                  </a>
                                  <br />
                                  <Row>
                                    <Col md="11">
                                      <span>
                                        {avatarContentType}, {byteSize(avatar)}
                                      </span>
                                    </Col>
                                    <Col md="1">
                                      <Button color="danger" onClick={this.clearBlob('avatar')}>
                                        <FontAwesomeIcon icon="trash" />
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : null}
                              <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
                            </AvGroup>
                          </Col>
                        </TabPane>
                        <TabPane tab="Liên hệ" key="5">
                          <Col md="6">
                            <AvGroup>
                              <Label id="customerLabel" for="customer">
                                <Translate contentKey="landexpApp.house.customer">Customer</Translate>
                              </Label>
                              <AvField id="house-customer" type="text" name="customer" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="mobileLabel" for="mobile">
                                <Translate contentKey="landexpApp.house.mobile">Mobile</Translate>
                              </Label>
                              <AvField id="house-mobile" type="text" name="mobile" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="emailLabel" for="email">
                                <Translate contentKey="landexpApp.house.email">Email</Translate>
                              </Label>
                              <AvField id="house-email" type="text" name="email" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="facebookLabel" for="facebook">
                                <Translate contentKey="landexpApp.house.facebook">Facebook</Translate>
                              </Label>
                              <AvField id="house-facebook" type="text" name="facebook" />
                            </AvGroup>
                          </Col>
                          <Col md="6">
                            <AvGroup>
                              <Label id="zaloLabel" for="zalo">
                                <Translate contentKey="landexpApp.house.zalo">Zalo</Translate>
                              </Label>
                              <AvField id="house-zalo" type="text" name="zalo" />
                            </AvGroup>
                          </Col>
                        </TabPane>
                      </Tabs>
                      <Row className="justify-content-center">
                        <Col md="12">
                          {!isNew ? (
                            <Col md="12">
                              <AvGroup>
                                <AvInput id="house-id" type="hidden" className="form-control" name="id" required readOnly />
                              </AvGroup>
                            </Col>
                          ) : null}
                          <Col md="12">
                            <Button tag={Link} id="cancel-save" to="/quan-ly/tin-dang" replace color="info">
                              <FontAwesomeIcon icon="arrow-left" />&nbsp;
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.back">Back</Translate>
                              </span>
                            </Button>
                            &nbsp;
                            <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                              <FontAwesomeIcon icon="save" />&nbsp;
                              <Translate contentKey="entity.action.save">Save</Translate>
                            </Button>
                          </Col>
                        </Col>
                      </Row>
                    </AvForm>
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
  cities: storeState.city.entities,
  districts: storeState.district.entities,
  wards: storeState.ward.entities,
  landProjects: storeState.landProject.entities,
  users: storeState.userManagement.users,
  houseEntity: storeState.house.entity,
  loading: storeState.house.loadingDetail,
  updating: storeState.house.updating
});

const mapDispatchToProps = {
  getCities,
  getDistricts,
  getWards,
  getLandProjects,
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseUpdate);
