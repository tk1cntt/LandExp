import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { Select, Form, Input, Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';

export interface IHouseDetailUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHouseDetailUpdateState {
  city: any;
  address: any;
  locations: any;
  projectId: number;
  direction: string;
  directionBalcony: string;
  floor: any;
}

export class HouseDetailUpdate extends React.Component<IHouseDetailUpdateProps, IHouseDetailUpdateState> {
  state: IHouseDetailUpdateState = {
    city: null,
    address: null,
    locations: [],
    projectId: 0,
    direction: undefined,
    directionBalcony: undefined,
    floor: null
  };

  componentDidMount() {
    const locations = this.state.locations;
    const cities = this.props.cities;
    cities.map(city => {
      const cityData = {
        value: city.id,
        label: city.name,
        children: []
      };
      city.districts.map(data => {
        const districtData = {
          value: data.id,
          label: data.name,
          children: []
        };
        data.wards.map(ward => {
          const wardData = {
            value: ward.id,
            label: ward.name
          };
          districtData.children.push(wardData);
        });
        cityData.children.push(districtData);
      });
      locations.push(cityData);
    });
    this.setState({
      locations
    });
  }

  onChangeCascader = value => {
    this.setState({
      city: value
    });
    this.props.updateHouse({
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    });
  };

  onChangeAddress = e => {
    this.setState({
      address: e.target.value
    });
    this.props.updateHouse({
      address: e.target.value
    });
  };

  onChangeActionType = value => {
    this.setState({
      address: value
    });
    this.props.updateHouse({
      address: value
    });
  };

  onChangeProject = value => {
    this.setState({
      address: value
    });
    this.props.updateHouse({
      address: value
    });
  };

  onChangeDirection = value => {
    this.setState({
      direction: value
    });
    this.props.updateHouse({
      direction: value
    });
  };

  onChangeDirectionBalcony = value => {
    this.setState({
      directionBalcony: value
    });
    this.props.updateHouse({
      directionBalcony: value
    });
  };

  onChangeFloor = e => {
    this.setState({
      floor: e.target.value
    });
    this.props.updateHouse({
      floor: e.target.value
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      }
    };

    const { houseEntity, landProjects } = this.props;

    return (
      <>
        <Col md="6">
          <Col md="12" style={{ marginBottom: 20 }}>
            <Label id="actionTypeLabel">
              <Translate contentKey="landexpApp.house.actionType">Action Type</Translate>
            </Label>
            <Select
              style={{ width: '100%' }}
              value={houseEntity.actionType || 'FOR_SELL'}
              placeholder="Hình thức"
              onChange={this.onChangeActionType}
            >
              <Option value="FOR_SELL">{getActionType('FOR_SELL')}</Option>
              <Option value="FOR_RENT">{getActionType('FOR_RENT')}</Option>
            </Select>
          </Col>
        </Col>
        <Col md="6">
          <Label id="landTypeLabel">
            <Translate contentKey="landexpApp.house.landType">Land Type</Translate>
          </Label>
          <Select
            style={{ width: '100%' }}
            value={houseEntity.landType || 'APARTMENT'}
            placeholder="Loại hình bất động sản"
            onChange={this.onChangeActionType}
          >
            <Option value="APARTMENT">{getLandType('APARTMENT')}</Option>
            <Option value="PEN_HOUSE">{getLandType('PEN_HOUSE')}</Option>
            <Option value="HOME">{getLandType('HOME')}</Option>
            <Option value="HOME_VILLA">{getLandType('HOME_VILLA')}</Option>
            <Option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</Option>
            <Option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</Option>
            <Option value="OFFICE">{getLandType('OFFICE')}</Option>
            <Option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</Option>
            <Option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</Option>
            <Option value="LAND_FARM">{getLandType('LAND_FARM')}</Option>
            <Option value="LAND_RESORT">{getLandType('LAND_RESORT')}</Option>
            <Option value="WAREHOUSES">{getLandType('WAREHOUSES')}</Option>
            <Option value="KIOSKS">{getLandType('KIOSKS')}</Option>
            <Option value="OTHER">{getLandType('OTHER')}</Option>
          </Select>
        </Col>
        <Col md="6">
          <Label id="projectLabel" for="project">
            <Translate contentKey="landexpApp.house.project">Project</Translate>
          </Label>
          <Select
            style={{ width: '100%' }}
            defaultValue={this.state.projectId}
            placeholder="Danh sách dự án"
            onChange={this.onChangeProject}
          >
            <Option value="" key="0" />
            {landProjects
              ? landProjects.map(otherEntity => (
                  <Option value={otherEntity.id} key={otherEntity.id}>
                    {otherEntity.name}
                  </Option>
                ))
              : null}
          </Select>
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
          <Label id="directionLabel">
            <Translate contentKey="landexpApp.house.direction">Direction</Translate>
          </Label>
          <Select
            style={{ width: '100%' }}
            defaultValue={houseEntity.direction || 'NORTH'}
            placeholder="Hướng nhà"
            onChange={this.onChangeDirection}
          >
            <Option value="" key="0" />
            <Option value="NORTH">{getDirection('NORTH')}</Option>
            <Option value="SOUTH">{getDirection('SOUTH')}</Option>
            <Option value="EAST">{getDirection('EAST')}</Option>
            <Option value="WEST">{getDirection('WEST')}</Option>
            <Option value="EAST_NORTH">{getDirection('EAST_NORTH')}</Option>
            <Option value="WEST_NORTH">{getDirection('WEST_NORTH')}</Option>
            <Option value="EAST_SOUTH">{getDirection('EAST_SOUTH')}</Option>
            <Option value="WEST_SOUTH">{getDirection('WEST_SOUTH')}</Option>
          </Select>
        </Col>
        <Col md="6">
          <Label id="directionBalconyLabel">
            <Translate contentKey="landexpApp.house.directionBalcony">Direction Balcony</Translate>
          </Label>
          <Select
            style={{ width: '100%' }}
            defaultValue={houseEntity.directionBalcony || 'NORTH'}
            placeholder="Hướng nhà"
            onChange={this.onChangeDirectionBalcony}
          >
            <Option value="" key="0" />
            <Option value="NORTH">{getDirection('NORTH')}</Option>
            <Option value="SOUTH">{getDirection('SOUTH')}</Option>
            <Option value="EAST">{getDirection('EAST')}</Option>
            <Option value="WEST">{getDirection('WEST')}</Option>
            <Option value="EAST_NORTH">{getDirection('EAST_NORTH')}</Option>
            <Option value="WEST_NORTH">{getDirection('WEST_NORTH')}</Option>
            <Option value="EAST_SOUTH">{getDirection('EAST_SOUTH')}</Option>
            <Option value="WEST_SOUTH">{getDirection('WEST_SOUTH')}</Option>
          </Select>
        </Col>
        <Col md="6">
          <Input addonBefore="Tầng số" defaultValue={houseEntity.floor} onChange={this.onChangeFloor} />
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
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities,
  landProjects: storeState.landProject.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseDetailUpdate);
