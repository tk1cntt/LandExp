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

export interface IStepFiveProp extends StateProps, DispatchProps {}

export interface IStepFiveState {
  sellType: string;
}

export class StepFive extends React.Component<IStepFiveProp, IStepFiveState> {
  state: IStepFiveState = {
    sellType: ''
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChange = e => {
    this.setState({
      sellType: e.target.value
    });
  }

  render() {
    const { account } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    return (
      <Row>
        <Col md="12">
          <h5>Giá và chính sách bán của bạn là gì?</h5>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Giá bán" placeholder="Giá bán ngôi nhà của bạn VNĐ?"/>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            Phí đăng 200.000 VNĐ
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            Hình thức bán
          </div>
        </Col>
        <Col md="12">
          <div>
            <RadioGroup onChange={this.onChange} value={this.state.sellType}>
              <Radio style={radioStyle} value={1}>Tự bán</Radio>
              Người mua quan tâm sẽ liên hệ trực tiếp với bạn
              <Radio style={radioStyle} value={2}>Hỗ trợ bán</Radio>
              Chúng tôi hỗ trợ bán tận răng
              <br/>
              Phí hoa hồng bán: 0.5%/giá bán (Không quá 10 triệu VNĐ)
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

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
