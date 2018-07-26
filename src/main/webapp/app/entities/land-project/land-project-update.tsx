import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Icon, Cascader } from 'antd';
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import { IRootState } from 'app/shared/reducers';

import { getAllEntities as getCities } from 'app/entities/city/city.reducer';
import { getAllEntities as getDistricts } from 'app/entities/district/district.reducer';
import { getEntities as getWards } from 'app/entities/ward/ward.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './land-project.reducer';

export interface ILandProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ILandProjectUpdateState {
  isNew: boolean;
  cityId: number;
  districtId: number;
  city: any;
  locations: any;
}

export class LandProjectUpdate extends React.Component<ILandProjectUpdateProps, ILandProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      locations: [],
      cityId: 0,
      districtId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
    this.mappingCity();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cities !== prevProps.cities) {
      this.mappingCity();
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  mappingCity() {
    const locations = [];
    this.props.cities.map(city => {
      const cityData = {
        value: city.id,
        label: city.name,
        children: []
      };
      city.districts.map(district => {
        const districtData = {
          value: district.id,
          label: district.type + ' ' + district.name
        };
        cityData.children.push(districtData);
      });
      locations.push(cityData);
    });
    this.setState({
      locations
    });
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { landProjectEntity } = this.props;
      const entity = {
        ...landProjectEntity,
        ...values,
        cityId: this.state.cityId || this.props.landProjectEntity.cityId,
        districtId: this.state.districtId || this.props.landProjectEntity.districtId
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
    this.props.history.push('/quan-ly/cac-du-an');
  };

  onChangeCascader = value => {
    this.setState({
      city: value,
      cityId: value[0],
      districtId: value[1]
    });
  };

  render() {
    const isInvalid = false;
    const { landProjectEntity, cities, districts, wards, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = landProjectEntity;
    const defaultValue = [landProjectEntity.cityId, landProjectEntity.districtId];

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
                  <Card title="Thông tin dự án">
                    <AvForm model={isNew ? {} : landProjectEntity} onSubmit={this.saveEntity}>
                      {!isNew ? (
                        <AvGroup>
                          <AvInput id="land-project-id" type="hidden" className="form-control" name="id" required readOnly />
                        </AvGroup>
                      ) : null}
                      <AvGroup>
                        <Label id="nameLabel" for="name">
                          <Translate contentKey="landexpApp.landProject.name">Name</Translate>
                        </Label>
                        <AvField id="land-project-name" type="text" name="name" />
                      </AvGroup>
                      <AvGroup>
                        <AvGroup>
                          <Label id="imageLabel" for="image">
                            <Translate contentKey="landexpApp.landProject.image">Image</Translate>
                          </Label>
                          <br />
                          {image ? (
                            <div>
                              <a onClick={openFile(imageContentType, image)}>
                                <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                              </a>
                              <br />
                              <Row>
                                <Col md="11">
                                  <span>
                                    {imageContentType}, {byteSize(image)}
                                  </span>
                                </Col>
                                <Col md="1">
                                  <Button color="danger" onClick={this.clearBlob('image')}>
                                    <FontAwesomeIcon icon="times-circle" />
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          ) : null}
                          <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                        </AvGroup>
                      </AvGroup>
                      <AvGroup>
                        <Label for="city.name">
                          <Translate contentKey="landexpApp.landProject.city">City</Translate>
                        </Label>
                        <Cascader
                          defaultValue={this.state.city || defaultValue}
                          options={this.state.locations}
                          onChange={this.onChangeCascader}
                          placeholder="Chọn thành phố"
                        />
                      </AvGroup>
                      <Button tag={Link} id="cancel-save" to="/quan-ly/cac-du-an" replace color="info">
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

const mapStateToProps = (storeState: IRootState) => ({
  cities: storeState.city.entities,
  districts: storeState.district.entities,
  wards: storeState.ward.entities,
  users: storeState.userManagement.users,
  landProjectEntity: storeState.landProject.entity,
  loading: storeState.landProject.loading,
  updating: storeState.landProject.updating
});

const mapDispatchToProps = {
  getCities,
  getDistricts,
  getWards,
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
)(LandProjectUpdate);
