import './search-menu.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Select, Input } from 'antd';
const Option = Select.Option;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType } from 'app/shared/util/utils';

export interface ISearchPageProp extends StateProps, DispatchProps {}

export class SearchPage extends React.Component<ISearchPageProp> {
  handleChangeActionType = () => {};

  actionTypeForm() {
    return (
      <Select style={{ width: 130, marginRight: 5 }} placeholder="Hình thức" onChange={this.handleChangeActionType}>
        <Option value="FOR_SELL">Bán</Option>
        <Option value="FOR_RENT">Cho thuê</Option>
      </Select>
    );
  }

  landTypeForm() {
    return (
      <Select style={{ width: 180, marginRight: 5 }} placeholder="Loại bất động sản" onChange={this.handleChangeActionType}>
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
    return <Input style={{ width: 340, marginRight: 5 }} placeholder="Nhập địa điểm, thành phố hoặc dự án" />;
  }

  priceForm() {
    return (
      <Select style={{ width: 145, marginRight: 5 }} placeholder="Khoảng giá" onChange={this.handleChangeActionType}>
        <Option value="">&lt; 500 triệu</Option>
        <Option value="">500 triệu - 1 tỷ</Option>
        <Option value="">1 - 1.5 tỷ</Option>
        <Option value="">1.5 - 2 tỷ</Option>
        <Option value="">2 - 3 tỷ</Option>
        <Option value="">3 - 5 tỷ</Option>
        <Option value="">&gt; 5 tỷ</Option>
      </Select>
    );
  }

  acreageForm() {
    return (
      <Select style={{ width: 145, marginRight: 5 }} placeholder="Diện tích" onChange={this.handleChangeActionType}>
        <Option value="">&lt; 50 m2</Option>
        <Option value="">50 - 80 m2</Option>
        <Option value="">80 - 100 m2</Option>
        <Option value="">100 - 200 m2</Option>
        <Option value="">&gt; 200 m2</Option>
      </Select>
    );
  }

  render() {
    const { account } = this.props;
    return (
      <Col md="12">
        <div style={{ marginBottom: 30 }} className="nav-search">
          <div className="container">
            <div className="row justify-content-center">
              {this.actionTypeForm()}
              {this.landTypeForm()}
              {this.keywordForm()}
              {this.priceForm()}
              {this.acreageForm()}
              <div className="select-box">
                <button>Tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
