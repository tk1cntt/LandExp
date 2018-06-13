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

export interface IStepOneProp extends StateProps, DispatchProps {}

export interface IStepOneState {
  landType: string,
  actionType: string
}

export class StepOne extends React.Component<IStepOneProp> {
  state: IStepOneState = {
    landType: '',
    actionType: ''
  };
  componentDidMount() {
    this.props.getSession();
  }

  onChangeActionType = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      actionType: e.target.value,
    });
  }

  onChangeLandType = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      landType: e.target.value,
    });
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <h5>Bạn muốn bán hay cho thuê bất động sản</h5>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeActionType} value={this.state.actionType} defaultValue="FOR_SELL">
              <RadioButton value={'FOR_SELL'}>Bán</RadioButton>
              <RadioButton value={'FOR_RENT'}>Cho thuê</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <h5 style={{ marginTop: 16 }}>Chọn loại bất động sản bạn muốn bán</h5>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType}>
              <RadioButton value="APARTMENT">Chung cư</RadioButton>
              <RadioButton value="HOME">Nhà riêng</RadioButton>
              <RadioButton value="HOME_VILLA">Biệt thự</RadioButton>
              <RadioButton value="HOME_STREET_SIDE">Nhà mặt phố</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType}>
              <RadioButton value="LAND_SCAPE">Đất ở</RadioButton>
              <RadioButton value="LAND_OF_PROJECT">Đất dự án</RadioButton>
              <RadioButton value="LAND_FARM">Đất nông nghiệp</RadioButton>
              <RadioButton value="LAND_RESORT">Resort</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeLandType} value={this.state.landType}>
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
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
