import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Upload, Icon, Modal, Radio, Input } from 'antd';
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepEightProp extends StateProps, DispatchProps {}

export interface IStepEightState {
  value: any;
}

export class StepEight extends React.Component<IStepEightProp, IStepEightState> {
  state: IStepEightState = {
    value: null
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { account } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    return (
      <div className="clearfix" style={{ margin: 30 }}>
        <div>
          <h6>Thanh toán phí đăng tin</h6>
        </div>
        <div>Bạn vui lòng chọn hình thức thanh toán phí đăng tin dưới đây.</div>
        <div>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>
              Option A
            </Radio>
            <Radio style={radioStyle} value={2}>
              Option B
            </Radio>
            <Radio style={radioStyle} value={3}>
              Option C
            </Radio>
          </RadioGroup>
        </div>
      </div>
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
)(StepEight);
