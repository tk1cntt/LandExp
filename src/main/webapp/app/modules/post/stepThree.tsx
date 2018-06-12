import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Cascader, Input, Select, Radio } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepThreeProp extends StateProps, DispatchProps {}

export interface IStepThreeState {
  directionType: string
}

export class StepThree extends React.Component<IStepThreeProp, IStepThreeState> {
  state: IStepThreeState = {
    directionType: ''
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChange = (e) => {
    this.setState({
      directionType: e.target.value,
    });
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <h5>Đặc điểm ngôi nhà của bạn</h5>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Diện tích" placeholder="Diện tích nhà bao nhiêu mét vuông?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Mặt tiền" placeholder="Diện tích mặt tiền bao nhiêu mét?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Số phòng ngủ" placeholder="Nhà bạn có bao nhiêu phòng ngủ?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Số phòng tắm" placeholder="Nhà bạn có bao nhiêu phòng tắm?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Tầng số" placeholder="Nhà bạn ở tâng bao nhiêu?"/>
          </div>
        </Col>
        <Col md="6">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Số tầng" placeholder="Nhà bạn có bao nhiêu tầng?"/>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <RadioGroup onChange={this.onChangeDirectionType} value={this.state.directionType}>
              <RadioButton value="EAST">Đông</RadioButton>
              <RadioButton value="WEST">Tây</RadioButton>
              <RadioButton value="SOUTH">Nam</RadioButton>
              <RadioButton value="NORTH">Bắc</RadioButton>
              <RadioButton value="EAST_NORTH">Đông Bắc</RadioButton>
              <RadioButton value="EAST_SOUTH">Đông Nam</RadioButton>
              <RadioButton value="WEST_NORTH">Tây Bắc</RadioButton>
              <RadioButton value="WEST_SOUTH">Tây Nam</RadioButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
