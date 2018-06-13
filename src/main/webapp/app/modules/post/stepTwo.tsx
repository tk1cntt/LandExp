import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import district from 'app/entities/district/district';

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

export interface IStepTwoProp extends StateProps, DispatchProps {
  updateHouse: any
}

export interface IStepOneState {
  city: any,
  address: any
}

export class StepTwo extends React.Component<IStepTwoProp, IStepOneState> {
  state: IStepOneState = {
    city: null,
    address: null
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChangeCascader = (value) => {
    this.setState({
      city: value
    });
    this.props.updateHouse({
      city: value[0],
      district: value[1],
      ward: value[2]
    });
  }

  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value
    });
    this.props.updateHouse({
      address: e.target.value
    });
  }

  render() {
    const { account } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 9
      }
    };

    const defaultValue = [this.props.house.city, this.props.house.district, this.props.house.ward];

    return (
      <Row>
        <Col md="6">
          <center><h6 style={{ marginTop: 16 }}>Vị trí bất động sản của bạn</h6></center>
        </Col>
        <Col md="12">
          <Form>
            <FormItem
              {...formItemLayout}
              label="Thành phố"
            >
              <Cascader defaultValue={this.state.city || defaultValue} options={options} onChange={this.onChangeCascader} placeholder="Chọn thành phố" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Địa chỉ chi tiết"
            >
              <Input placeholder="Số nhà, ngõ, ngách, phố" value={this.state.address || this.props.house.address} onChange={this.onChangeAddress} />
            </FormItem>
           </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
