/* tslint:disable */
import './home.css';

import React from 'react';
import * as $ from 'jquery';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Cascader, Radio } from 'antd';
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
    $('.select li').click(function() {
      $(this)
        .siblings()
        .removeClass('active');
      $(this).addClass('active');
    });

    $('.select .js-type li').click(function() {
      $('.select span#type').text($(this).html());
      $('.select input#slType').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-category li').click(function() {
      $('.select span#category').text($(this).html());
      $('.select input#slCategory').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-price li').click(function() {
      $('.select span#price').text($(this).text());
      $('.select input#slPrice').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-square li').click(function() {
      $('.select span#square').text($(this).text());
      $('.select input#slSqrare').attr('value', $(this).attr('data-value'));
    });

    $('.js-bathroom li').click(function() {
      $('.js-bathroom').css('display', 'none');
      $('#bathroom span').text($(this).html());
      $('input#slBathroom').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-bathroom li').click(function() {
      $('.select span#bathroom').text($(this).text());
      $('.select input#slBathroom').attr('value', $(this).attr('data-value'));
    });

    $('.js-bedroom li').click(function() {
      $('.js-bedroom').css('display', 'none');
      $('#bedroom span').text($(this).html());
      $('input#slBedroom').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-bedroom li').click(function() {
      $('.select span#bedroom').text($(this).text());
      $('.select input#slBedroom').attr('value', $(this).attr('data-value'));
    });

    $('.js-price .advance-options input').change(function() {
      $('#price').html($('.js-price input.min-value').val() + ' - ' + $('.js-price input.max-value').val() + ' tỷ');
    });

    $('.js-square .advance-options input').change(function() {
      $('#square').html($('.js-square input.min-value').val() + ' - ' + $('.js-square input.max-value').val() + ' m2');
    });
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
    )
  }

  searchClick = () => {
    this.props.history.push(`/tim-kiem?${queryString(this.state.parameters)}`);
  };

  menuLandTypeClick = e => {
    const parameters = { landType: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  menuLandTypeForm() {
    return (
      <div className="select">
        <div className="dropdown">
          <span id="category" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Loại bất động sản
            </span>
          <input type="hidden" id="slCategory" name="slCategory" />
          <ul className="dropdown-menu js-category" aria-labelledby="category" onClick={this.menuLandTypeClick}>
            <li className="options" data-value="APARTMENT">
              {getLandType('APARTMENT')}
            </li>
            <li className="options" data-value="PEN_HOUSE">
              {getLandType('PEN_HOUSE')}
            </li>
            <li className="options" data-value="HOME">
              {getLandType('HOME')}
            </li>
            <li className="options" data-value="HOME_VILLA">
              {getLandType('HOME_VILLA')}
            </li>
            <li className="options" data-value="HOME_STREET_SIDE">
              {getLandType('HOME_STREET_SIDE')}
            </li>
            <li className="options" data-value="OFFICE">
              {getLandType('OFFICE')}
            </li>
            <li className="options" data-value="LAND_SCAPE">
              {getLandType('LAND_SCAPE')}
            </li>
            <li className="options" data-value="LAND_OF_PROJECT">
              {getLandType('LAND_OF_PROJECT')}
            </li>
            <li className="options" data-value="LAND_FARM">
              {getLandType('LAND_FARM')}
            </li>
            <li className="options" data-value="LAND_RESORT">
              {getLandType('LAND_RESORT')}
            </li>
            <li className="options" data-value="WAREHOUSES">
              {getLandType('WAREHOUSES')}
            </li>
            <li className="options" data-value="KIOSKS">
              {getLandType('KIOSKS')}
            </li>
            <li className="options" data-value="MOTEL_ROOM">
              {getLandType('MOTEL_ROOM')}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  menuPriceClick = e => {
    const parameters = { money: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  menuPriceForm() {
    const items = [];
    for (let i = 0; i <= 5; i++) {
      items.push(
        <li
          key={`price-${i}`}
          className={`options ${this.state.parameters && parseInt(this.state.parameters.money) === i ? 'active' : ''}`}
          data-value={i}
          dangerouslySetInnerHTML={{ __html: getPriceByNumber(i) }}
        />
      );
    }
    return (
      <div className="select">
        <label>Khoảng giá</label>
        <div className="dropdown">
          {this.state.parameters && this.state.parameters.money ?
            <span id="price" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
              dangerouslySetInnerHTML={{ __html: getPriceByNumber(this.state.parameters.acreage) }}
            /> :
            (<span id="price" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Khoảng giá</span>)
          }
          <input type="hidden" id="slPrice" name="slPrice" />
          <ul className="dropdown-menu js-price" aria-labelledby="price" onClick={this.menuPriceClick}>
            {items}
          </ul>
        </div>
      </div>
    );
  }

  menuSpareClick = e => {
    const parameters = { acreage: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  }

  menuSpareForm() {
    const items = [];
    for (let i = 0; i <= 5; i++) {
      items.push(
        <li
          key={`spare-${i}`}
          className={`options ${this.state.parameters && parseInt(this.state.parameters.acreage) === i ? 'active' : ''}`}
          data-value={i}
          dangerouslySetInnerHTML={{ __html: getAcreageByNumber(i) }}
        />
      );
    }
    return (
      <div className="select">
        <label>Diện tích</label>
        <div className="dropdown">
          {this.state.parameters && this.state.parameters.acreage ?
            <span id="square" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
              dangerouslySetInnerHTML={{ __html: getAcreageByNumber(this.state.parameters.acreage) }}
            /> :
            (<span id="square" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Diện tích</span>)
          }
          <input type="hidden" id="slSqrare" name="slSqrare" />
          <ul className="dropdown-menu js-square" aria-labelledby="square" onClick={this.menuSpareClick}>
            {items}
          </ul>
        </div>
      </div>
    );
  }

  menuBathRoomClick = e => {
    const parameters = { bathRoom: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  }

  menuBathRoomForm() {
    return (
      <div className="select">
        <label>Số phòng tắm</label>
        <div className="dropdown">
          <span id="bathroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Bất kỳ
            </span>
          <input type="hidden" id="slBathroom" name="slBathroom" />
          <ul className="dropdown-menu js-bathroom" aria-labelledby="bathroom" onClick={this.menuBathRoomClick}>
            <li className="options" data-value={0}>
              Bất kỳ
              </li>
            <li className="options" data-value={1}>
              +1
              </li>
            <li className="options" data-value={2}>
              +2
              </li>
            <li className="options" data-value={3}>
              +3
              </li>
            <li className="options" data-value={4}>
              +4
              </li>
            <li className="options" data-value={5}>
              +5
              </li>
          </ul>
        </div>
      </div>
    );
  }

  menuBedRoomClick = e => {
    const parameters = { bedRoom: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  }

  menuBedRoomForm() {
    return (
      <div className="select">
        <label>Số phòng ngủ</label>
        <div className="dropdown">
          <span id="bedroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Bất kỳ
            </span>
          <input type="hidden" id="slBedroom" name="slBedroom" />
          <ul className="dropdown-menu js-bedroom" aria-labelledby="bedroom" onClick={this.menuBedRoomClick}>
            <li className="options" data-value={0}>
              Bất kỳ
              </li>
            <li className="options" data-value={1}>
              1
              </li>
            <li className="options" data-value={2}>
              2
              </li>
            <li className="options" data-value={3}>
              3
              </li>
            <li className="options" data-value={4}>
              4
              </li>
          </ul>
        </div>
      </div>
    );
  }

  handlActionTypeChange = e => {
    const parameters = { actionType: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  }

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
    )
  }

  render() {
    return (
      <div className="search">
        <h2>Nhu cầu của bạn là gì?</h2>
        {this.actionTypeForm()}
        <div className="search-box">
          <div className="top-search-box">
            {this.menuLandTypeForm()}
            {this.menuCityForm()}
            <div className="clearfix" />
          </div>
          <div className="bottom-search-box">
            {this.menuPriceForm()}
            {this.menuSpareForm()}
            {this.menuBedRoomForm()}
            {this.menuBathRoomForm()}
            <div className="clearfix" />
          </div>
          <button type="submit" onClick={this.searchClick}>TÌM KIẾM</button>
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
