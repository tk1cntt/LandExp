/* tslint:disable */
import './home.css';

import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Select, Cascader, Radio } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;

import { getAllEntities as getCities } from 'app/entities/city/city.reducer';
import { getLandType, getPriceByNumber, getAcreageByNumber, queryString } from 'app/shared/util/utils';

export interface IHomeSearchBoxProp extends StateProps, DispatchProps {
  location: any;
  history: any;
}

export interface IHomeSearchBoxState {
  city: any;
  parameters: any;
  locations: any;
}

export class HomeSearchBox extends React.Component<IHomeSearchBoxProp, IHomeSearchBoxState> {
  state: IHomeSearchBoxState = {
    city: null,
    parameters: { actionType: 'FOR_SELL' },
    locations: []
  };

  componentDidMount() {
    if (this.props.cities.length === 0) {
      this.props.getCities();
    } else {
      this.mappingCity();
    }
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      if (parsed) {
        this.setState({
          parameters: parsed,
          city: parsed.cityId ? [parseInt(parsed.cityId), parseInt(parsed.districtId), parseInt(parsed.wardId)] : null
        });
      }
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
    const parameters = {
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
      city: value
    });
  };

  menuCityForm() {
    return (
      <div className="keyword">
        <Cascader
          style={{ width: 530, marginLeft: 48 }}
          value={this.state.city}
          options={this.state.locations}
          onChange={this.onChangeCascader}
          placeholder="Chọn thành phố"
        />
      </div>
    );
  }

  searchClick = () => {
    this.props.history.push(`/tim-kiem?${queryString(this.state.parameters)}`);
  };

  menuLandTypeClick = value => {
    const parameters = { landType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  landTypeForm() {
    return (
      <div className="select">
        <Select
          style={{ width: 175, marginRight: -2 }}
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
      </div>
    );
  }

  menuPriceClick = value => {
    const parameters = { money: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  priceForm() {
    return (
      <div className="select">
        <label>Khoảng giá</label>
        <Select style={{ width: 175 }} value={this.state.parameters.money} placeholder="Khoảng giá" onChange={this.menuPriceClick}>
          <Option value="0">Bất kỳ</Option>
          <Option value="1">&lt; 500 triệu</Option>
          <Option value="2">500 triệu - 1 tỷ</Option>
          <Option value="3">1 - 1.5 tỷ</Option>
          <Option value="4">1.5 - 2 tỷ</Option>
          <Option value="5">&gt; 2 tỷ</Option>
        </Select>
      </div>
    );
  }

  menuAcreageClick = value => {
    const parameters = { acreage: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  acreageForm() {
    return (
      <div className="select">
        <label>Diện tích</label>
        <Select style={{ width: 175 }} value={this.state.parameters.acreage} placeholder="Diện tích" onChange={this.menuAcreageClick}>
          <Option value="0">Bất kỳ</Option>
          <Option value="1">&lt; 50 m2</Option>
          <Option value="2">50 - 80 m2</Option>
          <Option value="3">80 - 100 m2</Option>
          <Option value="4">100 - 200 m2</Option>
          <Option value="5">&gt; 200 m2</Option>
        </Select>
      </div>
    );
  }

  menuBathRoomClick = value => {
    const parameters = { bathRoom: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  menuBathRoomForm() {
    return (
      <div className="select">
        <label>Số phòng tắm</label>
        <Select style={{ width: 175 }} value={this.state.parameters.bathRoom} placeholder="Số phòng tắm" onChange={this.menuBathRoomClick}>
          <Option value="0">Bất kỳ</Option>
          <Option value="1">+1</Option>
          <Option value="2">+2</Option>
          <Option value="3">+3</Option>
          <Option value="4">+4</Option>
          <Option value="5">+5</Option>
        </Select>
      </div>
    );
  }

  menuBedRoomClick = value => {
    const parameters = { bedRoom: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  menuBedRoomForm() {
    return (
      <div className="select">
        <label>Số phòng ngủ</label>
        <Select style={{ width: 175 }} value={this.state.parameters.bedRoom} placeholder="Số phòng ngủ" onChange={this.menuBedRoomClick}>
          <Option value="0">Bất kỳ</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
      </div>
    );
  }

  handlActionTypeChange = value => {
    const parameters = { actionType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  actionTypeForm() {
    if (!this.state.parameters.actionType) {
      const parameters = { actionType: 'FOR_SELL' };
      const nextParameter = { ...this.state.parameters, ...parameters };
      this.setState({
        parameters: nextParameter
      });
    }
    return (
      <div className="select-box">
        <RadioGroup size="large" onChange={this.handlActionTypeChange} defaultValue={this.state.parameters.actionType}>
          <Radio value="FOR_SELL">Mua</Radio>
          <Radio value="FOR_RENT">Thuê</Radio>
        </RadioGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="search">
        <h2>Nhu cầu của bạn là gì?</h2>
        {this.actionTypeForm()}
        <div className="search-box">
          <div className="top-search-box">
            {this.landTypeForm()}
            {this.menuCityForm()}
            <div className="clearfix" />
          </div>
          <div className="bottom-search-box">
            {this.priceForm()}
            {this.acreageForm()}
            {this.menuBedRoomForm()}
            {this.menuBathRoomForm()}
            <div className="clearfix" />
          </div>
          <button type="submit" onClick={this.searchClick}>
            TÌM KIẾM
          </button>
        </div>
        <div className="download">
          <p>Tải ứng dụng trên Store</p>
          <div className="app-icon">
            <span>
              <a href="#">
                <i className="fa fa-apple" />
              </a>
            </span>
            <span>
              <a href="#">
                <i className="fa fa-android" />
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities
});

const mapDispatchToProps = { getCities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSearchBox);
