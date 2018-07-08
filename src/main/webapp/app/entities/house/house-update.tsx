import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Spin } from 'antd';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { IDistrict } from 'app/shared/model/district.model';
import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { IWard } from 'app/shared/model/ward.model';
import { getEntities as getWards } from 'app/entities/ward/ward.reducer';
import { IStreet } from 'app/shared/model/street.model';
import { getEntities as getStreets } from 'app/entities/street/street.reducer';
import { ILandProject } from 'app/shared/model/land-project.model';
import { getEntities as getLandProjects } from 'app/entities/land-project/land-project.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './house.reducer';
import { IHouse } from 'app/shared/model/house.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHouseUpdateState {
  isNew: boolean;
  cityId: number;
  districtId: number;
  wardId: number;
  streetId: number;
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
      streetId: 0,
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
    this.props.getStreets();
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

  streetUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        streetId: -1
      });
    } else {
      for (const i in this.props.streets) {
        if (name === this.props.streets[i].name.toString()) {
          this.setState({
            streetId: this.props.streets[i].id
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
    const { houseEntity, cities, districts, wards, streets, landProjects, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { avatar, avatarContentType } = houseEntity;

    return (
      <Row>
        <SearchPage />
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <h2 id="landexpApp.house.home.createOrEditLabel">
                <Translate contentKey="landexpApp.house.home.createOrEditLabel">Create or edit a House</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="12">
              {loading ? (
                <Spin tip="Đang cập nhật dữ liệu..." />
              ) : (
                <AvForm model={isNew ? {} : houseEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="house-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
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
                                <FontAwesomeIcon icon="times-circle" />
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
                    </AvGroup>
                  </AvGroup>
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
                  <AvGroup>
                    <Label id="addressLabel" for="address">
                      <Translate contentKey="landexpApp.house.address">Address</Translate>
                    </Label>
                    <AvField id="house-address" type="text" name="address" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="moneyLabel" for="money">
                      <Translate contentKey="landexpApp.house.money">Money</Translate>
                    </Label>
                    <AvField id="house-money" type="number" className="form-control" name="money" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="acreageLabel" for="acreage">
                      <Translate contentKey="landexpApp.house.acreage">Acreage</Translate>
                    </Label>
                    <AvField id="house-acreage" type="number" className="form-control" name="acreage" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="acreageStreetSideLabel" for="acreageStreetSide">
                      <Translate contentKey="landexpApp.house.acreageStreetSide">Acreage Street Side</Translate>
                    </Label>
                    <AvField id="house-acreageStreetSide" type="number" className="form-control" name="acreageStreetSide" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="discountLabel" for="discount">
                      <Translate contentKey="landexpApp.house.discount">Discount</Translate>
                    </Label>
                    <AvField id="house-discount" type="number" className="form-control" name="discount" />
                  </AvGroup>
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
                  <AvGroup>
                    <Label id="floorLabel" for="floor">
                      <Translate contentKey="landexpApp.house.floor">Floor</Translate>
                    </Label>
                    <AvField id="house-floor" type="text" name="floor" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="numberOfFloorLabel" for="numberOfFloor">
                      <Translate contentKey="landexpApp.house.numberOfFloor">Number Of Floor</Translate>
                    </Label>
                    <AvField id="house-numberOfFloor" type="number" className="form-control" name="numberOfFloor" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="bathRoomLabel" for="bathRoom">
                      <Translate contentKey="landexpApp.house.bathRoom">Bath Room</Translate>
                    </Label>
                    <AvField id="house-bathRoom" type="number" className="form-control" name="bathRoom" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="bedRoomLabel" for="bedRoom">
                      <Translate contentKey="landexpApp.house.bedRoom">Bed Room</Translate>
                    </Label>
                    <AvField id="house-bedRoom" type="number" className="form-control" name="bedRoom" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="parkingLabel" check>
                      <AvInput id="house-parking" type="checkbox" className="form-control" name="parking" />
                      <Translate contentKey="landexpApp.house.parking">Parking</Translate>
                    </Label>
                  </AvGroup>
                  <AvGroup>
                    <Label id="summaryLabel" for="summary">
                      <Translate contentKey="landexpApp.house.summary">Summary</Translate>
                    </Label>
                    <AvField id="house-summary" type="text" name="summary" />
                  </AvGroup>
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
                  <AvGroup>
                    <Label id="customerLabel" for="customer">
                      <Translate contentKey="landexpApp.house.customer">Customer</Translate>
                    </Label>
                    <AvField id="house-customer" type="text" name="customer" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="mobileLabel" for="mobile">
                      <Translate contentKey="landexpApp.house.mobile">Mobile</Translate>
                    </Label>
                    <AvField id="house-mobile" type="text" name="mobile" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="emailLabel" for="email">
                      <Translate contentKey="landexpApp.house.email">Email</Translate>
                    </Label>
                    <AvField id="house-email" type="text" name="email" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="facebookLabel" for="facebook">
                      <Translate contentKey="landexpApp.house.facebook">Facebook</Translate>
                    </Label>
                    <AvField id="house-facebook" type="text" name="facebook" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="zaloLabel" for="zalo">
                      <Translate contentKey="landexpApp.house.zalo">Zalo</Translate>
                    </Label>
                    <AvField id="house-zalo" type="text" name="zalo" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="statusTypeLabel">
                      <Translate contentKey="landexpApp.house.statusType">Status Type</Translate>
                    </Label>
                    <AvInput
                      id="house-statusType"
                      type="select"
                      className="form-control"
                      name="statusType"
                      value={(!isNew && houseEntity.statusType) || 'OPEN'}
                    >
                      <option value="OPEN">{getStatusType('OPEN')}</option>
                      <option value="PENDING">{getStatusType('PENDING')}</option>
                      <option value="PAID">{getStatusType('PAID')}</option>
                      <option value="CANCELED">{getStatusType('CANCELED')}</option>
                      <option value="EXPIRED">{getStatusType('EXPIRED')}</option>
                      <option value="SOLD">{getStatusType('SOLD')}</option>
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="city.name">
                      <Translate contentKey="landexpApp.house.city">City</Translate>
                    </Label>
                    <AvInput id="house-city" type="select" className="form-control" name="cityId" onChange={this.cityUpdate}>
                      <option value="" key="0" />
                      {cities
                        ? cities.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="district.name">
                      <Translate contentKey="landexpApp.house.district">District</Translate>
                    </Label>
                    <AvInput id="house-district" type="select" className="form-control" name="districtId" onChange={this.districtUpdate}>
                      <option value="" key="0" />
                      {districts
                        ? districts.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="ward.name">
                      <Translate contentKey="landexpApp.house.ward">Ward</Translate>
                    </Label>
                    <AvInput id="house-ward" type="select" className="form-control" name="wardId" onChange={this.wardUpdate}>
                      <option value="" key="0" />
                      {wards
                        ? wards.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="street.name">
                      <Translate contentKey="landexpApp.house.street">Street</Translate>
                    </Label>
                    <AvInput id="house-street" type="select" className="form-control" name="streetId" onChange={this.streetUpdate}>
                      <option value="" key="0" />
                      {streets
                        ? streets.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="project.name">
                      <Translate contentKey="landexpApp.house.project">Project</Translate>
                    </Label>
                    <AvInput id="house-project" type="select" className="form-control" name="projectId" onChange={this.projectUpdate}>
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
                  <AvGroup>
                    <Label for="createBy.login">
                      <Translate contentKey="landexpApp.house.createBy">Create By</Translate>
                    </Label>
                    <AvInput id="house-createBy" type="select" className="form-control" name="createById" onChange={this.createByUpdate}>
                      <option value="" key="0" />
                      {users
                        ? users.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.login}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="updateBy.login">
                      <Translate contentKey="landexpApp.house.updateBy">Update By</Translate>
                    </Label>
                    <AvInput id="house-updateBy" type="select" className="form-control" name="updateById" onChange={this.updateByUpdate}>
                      <option value="" key="0" />
                      {users
                        ? users.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.login}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <Button tag={Link} id="cancel-save" to="/entity/house" replace color="info">
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
                </AvForm>
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
  streets: storeState.street.entities,
  landProjects: storeState.landProject.entities,
  users: storeState.userManagement.users,
  houseEntity: storeState.house.entity,
  loading: storeState.house.loading,
  updating: storeState.house.updating
});

const mapDispatchToProps = {
  getCities,
  getDistricts,
  getWards,
  getStreets,
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

export default connect(mapStateToProps, mapDispatchToProps)(HouseUpdate);
