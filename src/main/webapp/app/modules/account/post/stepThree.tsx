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
  updateHouse: Function;
  house: any;
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
  furniture: any;
  summary: any;
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
    parking: null,
    furniture: null,
    summary: null
  };

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
  };

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
  };

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
  };

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
  };

  onChangeFloor = e => {
    this.setState({
      floor: e.target.value
    });
    this.props.updateHouse({
      floor: e.target.value
    });
  };

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
  };

  onChangeDirection = e => {
    this.setState({
      direction: e.target.value
    });
    this.props.updateHouse({
      direction: e.target.value
    });
  };

  onChangeDirectionBalcony = e => {
    this.setState({
      directionBalcony: e.target.value
    });
    this.props.updateHouse({
      directionBalcony: e.target.value
    });
  };

  onChangeParking = e => {
    this.setState({
      parking: e.target.checked
    });
    this.props.updateHouse({
      parking: e.target.checked
    });
  };

  onChangeFurniture = e => {
    this.setState({
      furniture: e.target.checked
    });
    this.props.updateHouse({
      furniture: e.target.checked
    });
  };

  onChangeSummary = e => {
    this.setState({
      summary: e.target.value
    });
    this.props.updateHouse({
      summary: e.target.value
    });
  };

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <p className="text-center subtitle">
            <i className="fa fa-lightbulb-o" />
            <em>
              Cung cấp đầy đủ thông tin đặc điểm bất động sản của bạn để người mua có được nhiều thông tin và cơ hội bán sẽ nhanh hơn!
            </em>
          </p>
        </Col>
        <Col md="6">
          <div>
            <Input
              addonBefore="Diện tích sàn"
              type="number"
              value={this.state.acreage || this.props.house.acreage}
              onChange={this.onChangeAcreage}
              placeholder="Diện tích theo mét vuông?"
            />
          </div>
        </Col>
        <Col md="6">
          <div>
            <Input
              addonBefore="Mặt tiền"
              type="number"
              value={this.state.acreageStreetSide || this.props.house.acreageStreetSide}
              onChange={this.onChangeAcreageStreetSide}
              placeholder="Diện tích theo mét?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Số phòng ngủ"
              type="number"
              value={this.state.bedRoom || this.props.house.bedRoom}
              onChange={this.onChangeBedRoom}
              placeholder="Có bao nhiêu phòng ngủ?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Số phòng tắm"
              type="number"
              value={this.state.bathRoom || this.props.house.bathRoom}
              onChange={this.onChangeBathRoom}
              placeholder="Có bao nhiêu phòng tắm?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Tầng số"
              value={this.state.floor || this.props.house.floor}
              onChange={this.onChangeFloor}
              placeholder="Nhà bạn ở tầng bao nhiêu?"
            />
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input
              addonBefore="Số tầng"
              type="number"
              value={this.state.numberOfFloor || this.props.house.numberOfFloor}
              onChange={this.onChangeNumberOfFloor}
              placeholder="Nhà bạn có bao nhiêu tầng?"
            />
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
            <Checkbox onChange={this.onChangeParking} checked={this.state.parking || this.props.house.parking}>
              Có chỗ để ôtô
            </Checkbox>
          </div>
        </Col>
        {/*
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Checkbox onChange={this.onChangeFurniture} checked={this.state.furniture || this.props.house.furniture}>Nội thất đầy đủ</Checkbox>
          </div>
        </Col>
        */}
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <TextArea onChange={this.onChangeSummary} placeholder="Mô tả thêm về ngôi nhà của bạn" autosize={{ minRows: 2, maxRows: 6 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
