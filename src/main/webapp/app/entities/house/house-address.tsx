import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Form, Input, Cascader } from 'antd';
const FormItem = Form.Item;

import GoogleMaps from 'app/shared/util/google-maps';

export interface IHouseAddressUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHouseAddressUpdateState {
  city: any;
  address: any;
  locations: any;
  wardEntity: any;
}

export class HouseAddressUpdate extends React.Component<IHouseAddressUpdateProps, IHouseAddressUpdateState> {
  state: IHouseAddressUpdateState = {
    city: null,
    address: null,
    locations: [],
    wardEntity: null
  };

  componentDidMount() {
    this.mappingCity();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cities !== prevProps.cities) {
      this.mappingCity();
    }
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
          label: district.type + ' ' + district.name,
          children: []
        };
        district.wards.map(ward => {
          const wardData = {
            value: ward.id,
            label: ward.type + ' ' + ward.name
          };
          if (this.props.houseEntity.wardId === ward.id) {
            this.setState({
              wardEntity: ward
            });
          }
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

  updateMarkerPosition = position => {
    this.props.updateHouse(position);
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

    const defaultValue = [this.props.houseEntity.cityId, this.props.houseEntity.districtId, this.props.houseEntity.wardId];

    const { latitude, longitude } = this.props.houseEntity;
    const currentPosition = {
      latitude: latitude ? latitude : this.state.wardEntity ? this.state.wardEntity.latitude : null,
      longitude: longitude ? longitude : this.state.wardEntity ? this.state.wardEntity.longitude : null
    };

    return (
      <>
        <h3 className="text-center">
          <strong>Vị trí bất động sản của bạn?</strong>
        </h3>
        <Col md="12">
          <FormItem {...formItemLayout} label="Thành phố">
            <Cascader
              defaultValue={this.state.city || defaultValue}
              options={this.state.locations}
              onChange={this.onChangeCascader}
              placeholder="Chọn thành phố"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="Địa chỉ chi tiết">
            <Input
              placeholder="Số nhà, ngõ, ngách, phố"
              value={this.state.address || this.props.houseEntity.address}
              onChange={this.onChangeAddress}
            />
          </FormItem>
          <GoogleMaps updateMarkerPosition={this.updateMarkerPosition} currentPosition={currentPosition} />
        </Col>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseAddressUpdate);
