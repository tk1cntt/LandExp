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
import { getImageOfHouse, createEntity as createPhoto } from 'app/entities/house-photo/house-photo.reducer';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import HouseDetail from './house-detail';
import HouseAddress from './house-address';
import HousePrice from './house-price';
import HouseInfoUpdate from './house-info';
import HousePhotoUpdate from './house-photo';

export interface IHouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHouseUpdateState {
  house: any;
}

export class HouseUpdate extends React.Component<IHouseUpdateProps, IHouseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      house: {}
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getImageOfHouse(this.props.match.params.id);
    this.props.getLandProjects();
  }

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    this.setState({
      house: nextHouse
    });
  };

  saveEntity = () => {
    const { houseEntity } = this.props;
    const entity = {
      ...houseEntity,
      ...this.state.house
    };
    this.props.updateEntity(entity);
    if (entity.fileList) {
      entity.fileList.map(file => {
        if (file.photoId) {
          // this.props.updatePhoto({ id: file.photoId, image: realData, imageContentType: file.type, houseId: this.props.house.id });
        } else {
          const imageURL = file.thumbUrl;
          const block = imageURL.split(';');
          const realData = block[1].split(',')[1];
          this.props.createPhoto({ image: realData, imageContentType: file.type, houseId: houseEntity.id });
        }
      });
    }
    this.handleClose();
  };

  handleClose = () => {
    this.props.history.push('/quan-ly/tin-dang');
  };

  render() {
    const isInvalid = false;
    const { houseEntity, cities, districts, wards, landProjects, users, loading, updating } = this.props;
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
                        <HousePhotoUpdate updateHouse={this.updateHouse} houseEntity={entity} />
                      </TabPane>
                      <TabPane tab="Liên hệ" key="5">
                        <HouseInfoUpdate updateHouse={this.updateHouse} houseEntity={entity} />
                      </TabPane>
                    </Tabs>
                    <Row className="justify-content-center">
                      <Col md="12">
                        <Col md="12">
                          <Button tag={Link} id="cancel-save" to="/quan-ly/tin-dang" replace color="info">
                            <FontAwesomeIcon icon="arrow-left" />&nbsp;
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.back">Back</Translate>
                            </span>
                          </Button>
                          &nbsp;
                          <Button color="primary" id="save-entity" onClick={this.saveEntity} disabled={isInvalid || updating}>
                            <FontAwesomeIcon icon="save" />&nbsp;
                            <Translate contentKey="entity.action.save">Save</Translate>
                          </Button>
                        </Col>
                      </Col>
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
  getImageOfHouse,
  getCities,
  getDistricts,
  getWards,
  getLandProjects,
  getUsers,
  getEntity,
  updateEntity,
  createPhoto,
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
