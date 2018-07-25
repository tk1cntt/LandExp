import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row, Container, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Card, Icon, Tooltip } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getPaymentStatus } from 'app/shared/util/utils';
import { getEntities, approvePayment } from './payment.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IPaymentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPaymentState extends IPaginationBaseState {
  showConfirm: any;
  paymentInfo: any;
}

export class Payment extends React.Component<IPaymentProps, IPaymentState> {
  state: IPaymentState = {
    showConfirm: false,
    paymentInfo: undefined,
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  gotoEdit = id => {
    this.props.history.push(`${this.props.match.url}/${id}/edit`);
  };

  showPaymentConfirm = paymentInfo => {
    this.setState({
      showConfirm: true,
      paymentInfo
    });
  };

  handlePaymentOk = id => {
    this.props.approvePayment(id);
    this.setState({
      showConfirm: false
    });
  };

  handlePaymentCancel = () => {
    this.setState({
      showConfirm: false
    });
  };

  render() {
    const { paymentList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              {this.props.loading || this.props.updating ? (
                <Loading />
              ) : (
                <Row>
                  <Card title="Danh sách chờ thanh toán">
                    <div className="table-responsive">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th className="hand" onClick={this.sort('code')}>
                              <Translate contentKey="landexpApp.payment.code">Code</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('money')}>
                              <Translate contentKey="landexpApp.payment.money">Money</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('paidTime')}>
                              <Translate contentKey="landexpApp.payment.paidTime">Paid Time</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('paymentStatus')}>
                              <Translate contentKey="landexpApp.payment.paymentStatus">Payment Status</Translate>{' '}
                              <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('createAt')}>
                              <Translate contentKey="landexpApp.payment.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                              <Translate contentKey="landexpApp.payment.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand">Nhân viên</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {paymentList.map((payment, i) => (
                            <tr key={`entity-${i}`}>
                              <td>{payment.code}</td>
                              <td>{new Intl.NumberFormat().format(payment.money)} VNĐ</td>
                              <td>
                                {!payment.paidTime ? (
                                  ''
                                ) : (
                                  <TextFormat type="date" value={payment.paidTime} format={APP_LOCAL_DATE_FORMAT} />
                                )}
                              </td>
                              <td>{getPaymentStatus(payment.paymentStatus)}</td>
                              <td>{payment.createAt ? payment.createAt : ''}</td>
                              <td>{payment.customerLogin ? payment.customerLogin : ''}</td>
                              <td>{payment.updateByLogin ? payment.updateByLogin : ''}</td>
                              {payment.paymentStatus !== 'PAID' ? (
                                <td style={{ display: 'inline-block', width: 70 }}>
                                  <div style={{ float: 'left', marginRight: 5 }} onClick={this.gotoEdit.bind(this, payment.id)}>
                                    <Tooltip placement="top" title={'Sửa tin đăng'}>
                                      <Icon type="edit" />{' '}
                                    </Tooltip>
                                  </div>
                                  <div style={{ float: 'left' }} onClick={this.showPaymentConfirm.bind(this, payment)}>
                                    <Tooltip placement="top" title={'Xác nhận thanh toán'}>
                                      <Icon type="pay-circle" />
                                    </Tooltip>
                                  </div>
                                </td>
                              ) : (
                                <td />
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {!this.state.showConfirm ? (
                      ''
                    ) : (
                      <Modal
                        title={`Xác nhận thanh toán cho tin đăng mã ${this.state.paymentInfo.code}`}
                        visible={this.state.showConfirm}
                        okText="Xác nhận"
                        okType="danger"
                        cancelText="Hủy"
                        onOk={this.handlePaymentOk.bind(this, this.state.paymentInfo.id)}
                        onCancel={this.handlePaymentCancel}
                      >
                        <p>Hãy xác nhận lại thông tin thanh toán</p>
                        <p>Mã thanh toán: {this.state.paymentInfo.code}</p>
                        <p>Số tiền: {new Intl.NumberFormat().format(this.state.paymentInfo.money)} VNĐ</p>
                        <p>Khách hàng: {this.state.paymentInfo.customerLogin}</p>
                      </Modal>
                    )}
                    <Row className="justify-content-center">
                      <JhiPagination
                        items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                        activePage={this.state.activePage}
                        onSelect={this.handlePagination}
                        maxButtons={3}
                      />
                    </Row>
                  </Card>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ payment }: IRootState) => ({
  paymentList: payment.entities,
  totalItems: payment.totalItems,
  loading: payment.loading,
  updating: payment.updating
});

const mapDispatchToProps = {
  getEntities,
  approvePayment
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
