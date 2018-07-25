import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Cascader, Input, Select, Radio } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepSixProp extends StateProps, DispatchProps {
  updateHouse: Function;
  house: any;
}

export interface IStepSixState {
  customer: any;
  mobile: any;
  email: any;
  zalo: any;
  facebook: any;
}

export class StepSix extends React.Component<IStepSixProp, IStepSixState> {
  state: IStepSixState = {
    customer: null,
    mobile: null,
    email: null,
    zalo: null,
    facebook: null
  };

  onChangeCustomer = e => {
    this.setState({
      customer: e.target.value
    });
    this.props.updateHouse({
      customer: e.target.value
    });
  };

  onChangeMobile = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        mobile: e.target.value
      });
      this.props.updateHouse({
        mobile: e.target.value
      });
    }
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
    this.props.updateHouse({
      email: e.target.value
    });
  };

  onChangeZalo = e => {
    this.setState({
      zalo: e.target.value
    });
    this.props.updateHouse({
      zalo: e.target.value
    });
  };

  onChangeFacebook = e => {
    this.setState({
      facebook: e.target.value
    });
    this.props.updateHouse({
      facebook: e.target.value
    });
  };

  render() {
    const { account } = this.props;
    return (
      <Row>
        <h3 className="text-center">
          <strong>Thông tin liên hệ của bạn</strong>
        </h3>
        <p className="text-center subtitle">
          <i className="fa fa-lightbulb-o" />
          <em>Cung cấp thông tin liên hệ của bạn tới người mua để họ liên hệ với bạn theo cách tốt nhất</em>
        </p>
        <Col md="12">
          <div>
            <Input
              onChange={this.onChangeCustomer}
              value={this.state.customer || this.props.house.customer}
              addonBefore="Họ và tên "
              placeholder="Họ và tên người liên hệ"
            />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input
              onChange={this.onChangeMobile}
              value={this.state.mobile || this.props.house.mobile}
              type="number"
              addonBefore="Điện thoại"
              placeholder="Số điện thoại liên hệ"
            />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input
              onChange={this.onChangeEmail}
              value={this.state.email || this.props.house.email}
              addonBefore="Email"
              placeholder="Địa chỉ email"
            />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input
              onChange={this.onChangeZalo}
              value={this.state.zalo || this.props.house.zalo}
              addonBefore="Zalo"
              placeholder="Tài khoản Zalo"
            />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input
              onChange={this.onChangeFacebook}
              value={this.state.facebook || this.props.house.facebook}
              addonBefore="Facebook"
              placeholder="Tài khoản Facebook"
            />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepSix);
