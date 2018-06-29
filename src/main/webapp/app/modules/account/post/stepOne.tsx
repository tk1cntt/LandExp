import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { Row as AntdRow, Col as AntdCol } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getActionType, getLandType } from 'app/shared/util/utils';

export interface IStepOneProp extends StateProps, DispatchProps {
  updateHouse: Function;
  house: any;
}

export interface IStepOneState {
  landType: any;
  actionType: any;
}

export class StepOne extends React.Component<IStepOneProp, IStepOneState> {
  state: IStepOneState = {
    landType: null,
    actionType: null
  };

  onChangeActionType = e => {
    this.setState({
      actionType: e.target.value
    });
    this.props.updateHouse({
      actionType: e.target.value
    });
  };

  onChangeItemActionType = e => {
    this.setState({
      actionType: e.target.value
    });
    this.props.updateHouse({
      actionType: e.target.value
    });
  };

  onChangeLandType = e => {
    this.setState({
      landType: e.target.value
    });
    this.props.updateHouse({
      landType: e.target.value
    });
  };

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <AntdRow type="flex" justify="center" align="middle">
            <h5 style={{ color: 'red' }}>Bạn muốn bán hay cho thuê bất động sản?</h5>
          </AntdRow>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <AntdRow className="cc-selector" type="flex" justify="center" align="middle">
              <AntdCol span={6} style={{ alignItems: 'center' }}>
                <div className="image-block">
                  <div className="image-item">
                    <input
                      checked={(this.state.actionType || this.props.house.actionType) === 'FOR_SELL' ? true : false}
                      id="visa"
                      type="radio"
                      name="credit-card"
                      value="FOR_SELL"
                      onClick={this.onChangeItemActionType}
                    />
                    <label className="drinkcard-cc sale" htmlFor="visa" />
                  </div>
                  <p>{getActionType('FOR_SELL')}</p>
                </div>
              </AntdCol>
              <AntdCol span={6} style={{ alignItems: 'center' }}>
                <div className="image-block">
                  <div className="image-item">
                    <input
                      checked={(this.state.actionType || this.props.house.actionType) === 'FOR_RENT' ? true : false}
                      id="mastercard"
                      type="radio"
                      name="credit-card"
                      value="FOR_RENT"
                      onClick={this.onChangeItemActionType}
                    />
                    <label className="drinkcard-cc sale" htmlFor="mastercard" />
                  </div>
                  <p>{getActionType('FOR_RENT')}</p>
                </div>
              </AntdCol>
            </AntdRow>
          </div>
        </Col>
        <Col md="12">
          <AntdRow type="flex" justify="center" align="middle">
            <h5 style={{ color: 'red', paddingTop: 20 }}>Chọn loại bất động sản bạn muốn bán</h5>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow style={{ marginTop: 16 }} className="cc-selector" type="flex" justify="space-around" align="middle">
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.actionType || this.props.house.actionType) === 'APARTMENT' ? true : false}
                    id="mastercard"
                    type="radio"
                    name="credit-card"
                    value="APARTMENT"
                    onClick={this.onChangeItemActionType}
                  />
                  <label className="drinkcard-cc sale" htmlFor="mastercard" />
                </div>
                <p>{getLandType('APARTMENT')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.actionType || this.props.house.actionType) === 'HOME' ? true : false}
                    id="visa"
                    type="radio"
                    name="credit-card"
                    value="HOME"
                    onClick={this.onChangeItemActionType}
                  />
                  <label className="drinkcard-cc rent" htmlFor="visa" />
                </div>
                <p>{getLandType('APARTMENT')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <input
                checked={(this.state.actionType || this.props.house.actionType) === 'HOME_VILLA' ? true : false}
                id="visa"
                type="radio"
                name="credit-card"
                value="HOME_VILLA"
                onClick={this.onChangeItemActionType}
              />
              <label className="drinkcard-cc rent" htmlFor="visa" />
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <input
                checked={(this.state.actionType || this.props.house.actionType) === 'HOME_STREET_SIDE' ? true : false}
                id="visa"
                type="radio"
                name="credit-card"
                value="HOME_STREET_SIDE"
                onClick={this.onChangeItemActionType}
              />
              <label className="drinkcard-cc rent" htmlFor="visa" />
            </AntdCol>
          </AntdRow>
          <AntdRow type="flex" justify="center" align="middle">
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="APARTMENT">{getLandType('APARTMENT')}</RadioButton>
              <RadioButton value="HOME">{getLandType('HOME')}</RadioButton>
              <RadioButton value="HOME_VILLA">{getLandType('HOME_VILLA')}</RadioButton>
              <RadioButton value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</RadioButton>
            </RadioGroup>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow style={{ marginTop: 16 }} type="flex" justify="center" align="middle">
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</RadioButton>
              <RadioButton value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</RadioButton>
              <RadioButton value="LAND_FARM">{getLandType('LAND_FARM')}</RadioButton>
              <RadioButton value="LAND_RESORT">{getLandType('LAND_RESORT')}</RadioButton>
            </RadioGroup>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow style={{ marginTop: 16 }} type="flex" justify="center" align="middle">
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</RadioButton>
              <RadioButton value="OFFICE">{getLandType('OFFICE')}</RadioButton>
              <RadioButton value="WAREHOUSES">{getLandType('WAREHOUSES')}</RadioButton>
              <RadioButton value="KIOSKS">{getLandType('KIOSKS')}</RadioButton>
            </RadioGroup>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow style={{ marginTop: 16 }} type="flex" justify="center" align="middle">
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="OTHER">{getLandType('OTHER')}</RadioButton>
            </RadioGroup>
          </AntdRow>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
