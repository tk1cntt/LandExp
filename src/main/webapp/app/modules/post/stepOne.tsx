import './stepOne.css';

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

import { updateEntity } from './post.reducer';

export interface IStepOneProp extends StateProps, DispatchProps {
  updateHouse: any
}

export interface IStepOneState {
  landType: any,
  actionType: any
}

export class StepOne extends React.Component<IStepOneProp> {
  state: IStepOneState = {
    landType: null,
    actionType: null
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChangeActionType = (e) => {
    this.setState({
      actionType: e.target.value
    });
    this.props.updateHouse({
      actionType: e.target.value
    });
  }

  onChangeLandType = (e) => {
    this.setState({
      landType: e.target.value
    });
    this.props.updateHouse({
      landType: e.target.value
    });
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <h6 style={{ marginTop: 16 }}>Bạn muốn bán hay cho thuê bất động sản?</h6>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeActionType} value={this.state.actionType || this.props.house.actionType} defaultValue="FOR_SELL">
              <RadioButton value={'FOR_SELL'}>Bán bất động sản</RadioButton>
              <RadioButton value={'FOR_RENT'}>Cho thuê bất động sản</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <h6 style={{ marginTop: 16 }}>Chọn loại bất động sản bạn muốn bán</h6>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || this.props.house.landType}>
              <RadioButton value="APARTMENT">Chung cư</RadioButton>
              <RadioButton value="HOME">Nhà riêng</RadioButton>
              <RadioButton value="HOME_VILLA">Biệt thự</RadioButton>
              <RadioButton value="HOME_STREET_SIDE">Nhà mặt phố</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || this.props.house.landType}>
              <RadioButton value="LAND_SCAPE">Đất ở</RadioButton>
              <RadioButton value="LAND_OF_PROJECT">Đất dự án</RadioButton>
              <RadioButton value="LAND_FARM">Đất nông nghiệp</RadioButton>
              <RadioButton value="LAND_RESORT">Resort</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType || this.props.house.landType}>
              <RadioButton value="MOTEL_ROOM">Phòng trọ</RadioButton>
              <RadioButton value="OFFICE">Văn phòng</RadioButton>
              <RadioButton value="WAREHOUSES">Kho, nhà xưởng</RadioButton>
              <RadioButton value="KIOSKS">Của hàng, Ki ốt</RadioButton>
              <RadioButton value="OTHER">Loại khác</RadioButton>
            </RadioGroup>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  house: storeState.house.entity
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
