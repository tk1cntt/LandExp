import './stepTwo.css';

import * as React from 'react';
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
  updateHouse;
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

  componentDidMount() {
    this.props.getSession();
  }

  onChangeCustomer = e => {
    this.setState({
      customer: e.target.value
    });
    this.props.updateHouse({
      customer: e.target.value
    });
  }

  onChangeMobile = e => {
    this.setState({
      mobile: e.target.value
    });
    this.props.updateHouse({
      mobile: e.target.value
    });
  }

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
    this.props.updateHouse({
      email: e.target.value
    });
  }

  onChangeZalo = e => {
    this.setState({
      zalo: e.target.value
    });
    this.props.updateHouse({
      zalo: e.target.value
    });
  }

  onChangeFacebook = e => {
    this.setState({
      facebook: e.target.value
    });
    this.props.updateHouse({
      facebook: e.target.value
    });
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <h5>Thông tin liên hệ của bạn?</h5>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input onChange={this.onChangeCustomer} addonBefore="Họ và tên " placeholder="Ho và tên người liên hệ" />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input onChange={this.onChangeMobile} addonBefore="Điện thoại" placeholder="Số điện thoại liên hệ" />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input onChange={this.onChangeEmail} addonBefore="Email" placeholder="Địa chỉ email" />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input onChange={this.onChangeZalo} addonBefore="Zalo" placeholder="Số điện thoại Zalo" />
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input onChange={this.onChangeFacebook} addonBefore="Facebook" placeholder="Tài khoản facebook" />
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

export default connect(mapStateToProps, mapDispatchToProps)(StepSix);
