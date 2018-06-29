import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
          <h6>Bạn muốn bán hay cho thuê bất động sản?</h6>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup
              onChange={this.onChangeActionType}
              value={this.state.actionType || (this.props.house && this.props.house.actionType)}
              defaultValue="FOR_SELL"
            >
              <RadioButton value={'FOR_SELL'}>{getActionType('FOR_SELL')}</RadioButton>
              <RadioButton value={'FOR_RENT'}>{getActionType('FOR_RENT')}</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <h6 style={{ marginTop: 16 }}>Chọn loại bất động sản bạn muốn bán</h6>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="APARTMENT">{getLandType('APARTMENT')}</RadioButton>
              <RadioButton value="HOME">{getLandType('HOME')}</RadioButton>
              <RadioButton value="HOME_VILLA">{getLandType('HOME_VILLA')}</RadioButton>
              <RadioButton value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</RadioButton>
              <RadioButton value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</RadioButton>
              <RadioButton value="LAND_FARM">{getLandType('LAND_FARM')}</RadioButton>
              <RadioButton value="LAND_RESORT">{getLandType('LAND_RESORT')}</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</RadioButton>
              <RadioButton value="OFFICE">{getLandType('OFFICE')}</RadioButton>
              <RadioButton value="WAREHOUSES">{getLandType('WAREHOUSES')}</RadioButton>
              <RadioButton value="KIOSKS">{getLandType('KIOSKS')}</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || (this.props.house && this.props.house.landType)}>
              <RadioButton value="OTHER">{getLandType('OTHER')}</RadioButton>
            </RadioGroup>
          </div>
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
