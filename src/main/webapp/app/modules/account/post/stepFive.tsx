import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import * as NumberFormat from 'react-number-format';
import { Cascader, Input, Form, Radio } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getPresent, getSaleType } from 'app/shared/util/utils';

export interface IStepFiveProp extends StateProps, DispatchProps {
  updateHouse: Function;
  house: any;
}

export interface IStepFiveState {
  money: any;
  discount: any;
  present: any;
  saleType: any;
}

export class StepFive extends React.Component<IStepFiveProp, IStepFiveState> {
  state: IStepFiveState = {
    money: null,
    discount: null,
    present: null,
    saleType: null
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChangeMoney = e => {
    this.setState({
      money: e.target.value
    });
    this.props.updateHouse({
      money: e.target.value
    });
  };

  onChangeMoneyDiscount = e => {
    this.setState({
      discount: e.target.value
    });
    this.props.updateHouse({
      discount: e.target.value
    });
  };

  onChangePresent = e => {
    this.setState({
      present: e.target.value
    });
    this.props.updateHouse({
      present: e.target.value
    });
  };

  onChangeSaleType = e => {
    this.setState({
      saleType: e.target.value
    });
    this.props.updateHouse({
      saleType: e.target.value
    });
  };

  render() {
    const { account } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <Row>
        <Col md="12">
          <Form>
            <FormItem {...formItemLayout} label="Giá bán đề xuất">
              <NumberFormat
                value={this.state.money || this.props.house.money}
                displayType={'input'}
                customInput={Input}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue, value } = values;
                  this.setState({
                    money: formattedValue
                  });
                  this.props.updateHouse({
                    money: value
                  });
                }}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Giá bán mong muốn">
              <NumberFormat
                value={this.state.discount || this.props.house.discount}
                displayType={'input'}
                customInput={Input}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue, value } = values;
                  this.setState({
                    discount: formattedValue
                  });
                  this.props.updateHouse({
                    discount: value
                  });
                }}
              />
            </FormItem>
          </Form>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>Hỗ trợ sau mua bán</div>
        </Col>
        <Col md="12">
          <div>
            <RadioGroup onChange={this.onChangePresent} value={this.state.present || this.props.house.present}>
              <Radio style={radioStyle} value={'NONE'}>
                {getPresent('NONE')}
              </Radio>
              <Radio style={radioStyle} value={'BASIC_FURNITURE'}>
                {getPresent('BASIC_FURNITURE')}
              </Radio>
              <Radio style={radioStyle} value={'FULL_FURNITURE'}>
                {getPresent('FULL_FURNITURE')}
              </Radio>
              <Radio style={radioStyle} value={'DISCOUNT_PRICE'}>
                {getPresent('DISCOUNT_PRICE')}
              </Radio>
              <Radio style={radioStyle} value={'SUPPORT_EXHIBIT'}>
                {getPresent('SUPPORT_EXHIBIT')}
              </Radio>
              <Radio style={radioStyle} value={'SUPPORT_FEE'}>
                {getPresent('SUPPORT_FEE')}
              </Radio>
              <Radio style={radioStyle} value={'HAVE_PRESENT'}>
                {getPresent('HAVE_PRESENT')}
              </Radio>
            </RadioGroup>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>Gói đăng tin</div>
        </Col>
        <Col md="12">
          <div>
            <RadioGroup onChange={this.onChangeSaleType} value={this.state.saleType || this.props.house.saleType}>
              1. Thông thường (Người mua quan tâm sẽ liên hệ trực tiếp với bạn)
              <Radio style={radioStyle} value={'SALE_BY_MYSELF'}>
                {getSaleType('SALE_BY_MYSELF')}
              </Radio>
              Được đăng tin vô thời giạn trên trang web
              <Radio style={radioStyle} value={'SALE_BY_MYSELF_VIP'}>
                {getSaleType('SALE_BY_MYSELF_VIP')}
              </Radio>
              Sẽ xuất hiện ưu tiên trên trang chủ và các trang tìm kiếm
              <br />
              2. Ký gửi (Chúng tôi hỗ trợ bán tận răng)
              <Radio style={radioStyle} value={'SALE_SUPPORT'}>
                {getSaleType('SALE_SUPPORT')}
              </Radio>
              Chúng tôi sẽ tìm kiếm khách hàng giúp bạn
              <Radio style={radioStyle} value={'SALE_SUPPORT_VIP'}>
                {getSaleType('SALE_SUPPORT_VIP')}
              </Radio>
              Sử dụng các nghiệp vụ marketing để bán được nhà của bạn hiệu quả nhất
              <br />
              Hoa hồng ký gửi: 0.5%/giá bán (Không quá 10 triệu VNĐ)
            </RadioGroup>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  serviceFees: storeState.serviceFee.entities
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
