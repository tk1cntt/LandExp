import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Container, Alert } from 'reactstrap';
import { Card, Radio, Input, Button } from 'antd';
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntity as getPayment } from 'app/entities/payment/payment.reducer';
import { decodePayment } from 'app/shared/util/utils';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IPaymentProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IPaymentState {
  value: any;
}

export class Payment extends React.Component<IPaymentProp, IPaymentState> {
  state: IPaymentState = {
    value: null
  };

  componentDidMount() {
    const paymentId = decodePayment(this.props.match.params.id);
    /* tslint:disable-next-line */
    this.props.getPayment(parseInt(paymentId));
    this.props.getSession();
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  updatePaymentInfo() {
    return (
      <Row>
        <Col md="6">Mã thanh toán</Col>
        <Col md="6" style={{ color: 'red' }}>
          {this.props.payment.code}
        </Col>
        <Col md="6">Phí đăng tin</Col>
        <Col md="6" style={{ color: 'red' }}>
          {new Intl.NumberFormat().format(this.props.payment.money)} VNĐ
        </Col>
      </Row>
    );
  }

  updateTransferInfo() {
    return (
      <Row style={{ padding: 20 }}>
        <Col md="6">Tên đơn vị hưởng thụ:</Col>
        <Col md="6" style={{ fontWeight: 'bold' }}>
          Công ty TNHH Abuma
        </Col>
        <Col md="6">Số tài khoản:</Col>
        <Col md="6" style={{ fontWeight: 'bold', color: 'blue' }}>
          0123456789
        </Col>
        <Col md="6">Ngân hàng:</Col>
        <Col md="6">Á Châu (ACB)</Col>
        <Col md="6">Số tiền:</Col>
        <Col md="6" style={{ color: 'red' }}>
          {new Intl.NumberFormat().format(this.props.payment.money)} VNĐ
        </Col>
        <Col md="6">Nội dung chuyển khoản:</Col>
        <Col md="6" style={{ fontWeight: 'bold' }}>
          TTT {this.props.payment.code}
        </Col>
      </Row>
    );
  }

  render() {
    const { account } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    return (
      <div>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="8">
              <div style={{ height: '100%' }}>
                <Card title="Thanh toán phí đăng tin" bordered={false} style={{ width: '100%', height: '100%' }}>
                  <div>
                    <h6>Bạn vui lòng chọn hình thức thanh toán phí đăng tin dưới đây.</h6>
                  </div>
                  <div>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio style={radioStyle} value={1}>
                        Thanh toán chuyển khoản
                      </Radio>
                      <Radio style={radioStyle} value={2}>
                        Thanh toán online
                      </Radio>
                    </RadioGroup>
                  </div>
                  {this.state.value === 1 ? this.updateTransferInfo() : ''}
                </Card>
              </div>
            </Col>
            <Col md="4">
              <div style={{ height: '100%' }}>
                <Card title="Thông tin thanh toán của bạn" bordered={false} style={{ width: '100%', height: '100%' }}>
                  {this.updatePaymentInfo()}
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  payment: storeState.payment.entity
});

const mapDispatchToProps = { getSession, getPayment };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
