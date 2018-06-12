import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Cascader, Input } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepTwoProp extends StateProps, DispatchProps {}

const options = [{
  value: 'HANOI',
  label: 'Hà Nội',
  children: [{
    value: 'CAUGIAY',
    label: 'Cầu Giấy',
    children: [{
      value: 'DICHVONG',
      label: 'Dịch Vọng'
    }, {
      value: 'DICHVONGHAU',
      label: 'Dịch Vọng Hậu'
    }, {
      value: 'TRUNGHOA',
      label: 'Trung Hoà'
    }, {
      value: 'YENHOA',
      label: 'Yên Hoà'
    }]
  }, {
    value: 'HADONG',
    label: 'Hà Đông',
    children: [{
      value: 'VANPHUC',
      label: 'Vạn Phúc'
    }, {
      value: 'VANQUAN',
      label: 'Văn Quán'
    }]
  }]
}, {
  value: 'HOCHIMINH',
  label: 'Hồ Chí Minh',
  children: [{
    value: 'QUAN1',
    label: 'Quận 1',
    children: [{
      value: 'BENNGHE',
      label: 'Bến Nghé'
    }, {
      value: 'BENTHANH',
      label: 'Bến Nghé'
    }]
  }, {
    value: 'QUAN2',
    label: 'Quận 2',
    children: [{
      value: 'ANKHANH',
      label: 'An Khánh'
    }, {
      value: 'BINHKHANH',
      label: 'Bình Khánh'
    }]
  }]
}];

export class StepTwo extends React.Component<IStepTwoProp> {
  componentDidMount() {
    this.props.getSession();
  }

  onChange = (e) => {
    console.log('Cascader changed', e);
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <h5>Vị trí bất động sản của bạn</h5>
        </Col>
        <Col md="12">
          <Cascader style={{ width: '50%' }} options={options} onChange={this.onChange} placeholder="Please select" />
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Địa chỉ chi tiết" placeholder="Số nhà, ngõ, ngách, phố"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
