import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Cascader, Input, Select, Radio, Checkbox } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepThreeProp extends StateProps, DispatchProps {
  updateHouse
}

export interface IStepThreeState {
  acreage: any;
  acreageStreetSide: any;
  bedRoom: any;
  bathRoom: any;
  direction: any;
  directionBalcony: any;
  numberOfFloor: any;
  floor: any;
  parking: any;
}

export class StepThree extends React.Component<IStepThreeProp, IStepThreeState> {
  state: IStepThreeState = {
    acreage: null,
    acreageStreetSide: null,
    bedRoom: null,
    bathRoom: null,
    direction: null,
    directionBalcony: null,
    numberOfFloor: null,
    floor: null,
    parking: null
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChangeAcreage = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        acreage: e.target.value
      });
      this.props.updateHouse({
        acreage: e.target.value
      });
    }
  }

  onChangeAcreageStreetSide = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        acreageStreetSide: e.target.value
      });
      this.props.updateHouse({
        acreageStreetSide: e.target.value
      });
    }
  }

  onChangeBedRoom = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        bedRoom: e.target.value
      });
      this.props.updateHouse({
        bedRoom: e.target.value
      });
    }
  }

  onChangeBathRoom = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        bathRoom: e.target.value
      });
      this.props.updateHouse({
        bathRoom: e.target.value
      });
    }
  }

  onChangeFloor = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        floor: e.target.value
      });
      this.props.updateHouse({
        floor: e.target.value
      });
    }
  }

  onChangeNumberOfFloor = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        numberOfFloor: e.target.value
      });
      this.props.updateHouse({
        numberOfFloor: e.target.value
      });
    }
  }

  onChangeDirection = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        direction: e.target.value
      });
      this.props.updateHouse({
        direction: e.target.value
      });
    }
  }

  onChangeDirectionBalcony = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        directionBalcony: e.target.value
      });
      this.props.updateHouse({
        directionBalcony: e.target.value
      });
    }
  }

  onChangeParking = e => {
    const { value } = e.target;
    const reg = /^-?([1-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        parking: e.target.value
      });
      this.props.updateHouse({
        parking: e.target.value
      });
    }
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <h6 style={{ marginTop: 16 }}>Đặc điểm ngôi nhà của bạn</h6>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Diện tích"
              value={this.state.acreage}
              defaultValue={this.state.acreage || this.props.house.acreage}
              onChange={this.onChangeAcreage}
              placeholder="Diện tích nhà bao nhiêu mét vuông?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Mặt tiền"
              value={this.state.acreageStreetSide}
              defaultValue={this.state.acreageStreetSide || this.props.house.acreageStreetSide}
              onChange={this.onChangeAcreageStreetSide}
              placeholder="Diện tích mặt tiền bao nhiêu mét?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Số phòng ngủ"
              type="number"
              value={this.state.bedRoom}
              defaultValue={this.state.bedRoom || this.props.house.bedRoom}
              onChange={this.onChangeBedRoom}
              placeholder="Nhà bạn có bao nhiêu phòng ngủ?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Số phòng tắm"
              type="number" value={this.state.bathRoom}
              defaultValue={this.state.bathRoom || this.props.house.bathRoom}
              onChange={this.onChangeBathRoom}
              placeholder="Nhà bạn có bao nhiêu phòng tắm?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Tầng số"
              value={this.state.floor}
              defaultValue={this.state.floor || this.props.house.floor}
              onChange={this.onChangeFloor}
              placeholder="Nhà bạn ở tâng bao nhiêu?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Số tầng"
              type="number"
              value={this.state.numberOfFloor}
              defaultValue={this.state.numberOfFloor || this.props.house.numberOfFloor}
              onChange={this.onChangeNumberOfFloor}
              placeholder="Nhà bạn có bao nhiêu tầng?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <b>Hướng nhà</b>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <b>Hướng ban công</b>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeDirection} value={this.state.direction || this.props.house.direction}>
              <RadioButton value="EAST">Đông</RadioButton>
              <RadioButton value="WEST">Tây</RadioButton>
              <RadioButton value="SOUTH">Nam</RadioButton>
              <RadioButton value="NORTH">Bắc</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeDirectionBalcony} value={this.state.directionBalcony || this.props.house.directionBalcony}>
              <RadioButton value="EAST">Đông</RadioButton>
              <RadioButton value="WEST">Tây</RadioButton>
              <RadioButton value="SOUTH">Nam</RadioButton>
              <RadioButton value="NORTH">Bắc</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeDirection} value={this.state.direction || this.props.house.direction}>
              <RadioButton value="EAST_NORTH">Đông Bắc</RadioButton>
              <RadioButton value="EAST_SOUTH">Đông Nam</RadioButton>
              <RadioButton value="WEST_NORTH">Tây Bắc</RadioButton>
              <RadioButton value="WEST_SOUTH">Tây Nam</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeDirectionBalcony} value={this.state.directionBalcony || this.props.house.directionBalcony}>
              <RadioButton value="EAST_NORTH">Đông Bắc</RadioButton>
              <RadioButton value="EAST_SOUTH">Đông Nam</RadioButton>
              <RadioButton value="WEST_NORTH">Tây Bắc</RadioButton>
              <RadioButton value="WEST_SOUTH">Tây Nam</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <b>Tiện nghi</b>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Checkbox>Có chỗ để ôtô</Checkbox>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Checkbox>Tiện nghi đầy đủ</Checkbox>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <TextArea placeholder="Mô tả thêm về ngôi nhà của bạn" autosize={{ minRows: 2, maxRows: 6 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
