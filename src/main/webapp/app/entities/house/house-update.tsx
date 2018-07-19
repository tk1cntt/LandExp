import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
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
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import HouseDetail from './house-detail';
import HouseAddress from './house-address';
import HousePrice from './house-price';

export interface IHouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHouseUpdateState {
  isNew: boolean;
  cityId: number;
  districtId: number;
  wardId: number;
  projectId: number;
  createById: number;
  updateById: number;
  house: any;
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
      house: {},
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

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    this.setState({
      house: nextHouse
    });
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

    const entity = {
      ...houseEntity,
      ...this.state.house
    };

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
                          <HouseDetail updateHouse={this.updateHouse} houseEntity={entity} />
                        </TabPane>
                        <TabPane tab="Giá" key="2">
                          <HousePrice updateHouse={this.updateHouse} houseEntity={entity} />
                        </TabPane>
                        <TabPane tab="Địa chỉ" key="3">
                          <HouseAddress updateHouse={this.updateHouse} houseEntity={entity} />
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
