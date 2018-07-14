import './search-menu-v2.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Col, Select, Button, Cascader } from 'antd';
const Option = Select.Option;

import { getAllEntities as getCities } from 'app/entities/city/city.reducer';
import { getLandType } from 'app/shared/util/utils';

export interface ISearchPageProp extends StateProps, DispatchProps {
  location: any;
  history: any;
}

export interface ISearchPageState {
  parameters: any;
  locations: any;
}

export class SearchPage extends React.Component<ISearchPageProp> {
  state: ISearchPageState = {
    parameters: {},
    locations: []
  };

  componentDidMount() {
    if (this.props.cities.length === 0) {
      this.props.getCities();
    } else {
      this.mappingCity();
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cities !== prevProps.cities) {
      this.mappingCity();
    }
  }

  mappingCity() {
    const locations = this.state.locations;
    this.props.cities.map(city => {
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

  handleChangeActionType = () => {};

  actionTypeForm() {
    return (
      <Select style={{ width: 140, marginRight: -2 }} placeholder="Hình thức" onChange={this.handleChangeActionType}>
        <Option value="FOR_SELL">Bán</Option>
        <Option value="FOR_RENT">Cho thuê</Option>
      </Select>
    );
  }

  landTypeForm() {
    return (
      <Select style={{ width: 180, marginRight: -2 }} placeholder="Loại bất động sản" onChange={this.handleChangeActionType}>
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

  keywordForm() {
    return (
      <Cascader
        style={{ width: 380, marginRight: -2 }}
        options={this.state.locations}
        onChange={this.onChangeCascader}
        placeholder="Chọn thành phố"
      />
    );
  }

  onChangeCascader = value => {
    this.setState({
      city: value
    });
  };

  priceForm() {
    return (
      <Select style={{ width: 150, marginRight: -2 }} placeholder="Khoảng giá" onChange={this.handleChangeActionType}>
        <Option value="0">Bất kỳ</Option>
        <Option value="1">&lt; 500 triệu</Option>
        <Option value="2">500 triệu - 1 tỷ</Option>
        <Option value="3">1 - 1.5 tỷ</Option>
        <Option value="4">1.5 - 2 tỷ</Option>
        <Option value="5">&gt; 2 tỷ</Option>
      </Select>
    );
  }

  acreageForm() {
    return (
      <Select style={{ width: 150, marginRight: -2 }} placeholder="Diện tích" onChange={this.handleChangeActionType}>
        <Option value="0">Bất kỳ</Option>
        <Option value="1">&lt; 50 m2</Option>
        <Option value="2">50 - 80 m2</Option>
        <Option value="3">80 - 100 m2</Option>
        <Option value="4">100 - 200 m2</Option>
        <Option value="5">&gt; 200 m2</Option>
      </Select>
    );
  }

  render() {
    return (
      <Col span={24}>
        <div className="nav-search">
          <div className="container">
            <div className="row">
              {this.actionTypeForm()}
              {this.landTypeForm()}
              {this.keywordForm()}
              {this.priceForm()}
              {this.acreageForm()}
              <Button>Tìm kiếm</Button>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  cities: storeState.city.entities
});

const mapDispatchToProps = { getCities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
