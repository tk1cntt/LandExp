import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './payment.reducer';
import { IPayment } from 'app/shared/model/payment.model';
// tslint:disable-next-line:no-unused-variable
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getPaymentStatus } from 'app/shared/util/utils';

export interface IPaymentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPaymentState extends IPaginationBaseState {
  search: string;
}

export class Payment extends React.Component<IPaymentProps, IPaymentState> {
  state: IPaymentState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

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

  render() {
    const { paymentList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="payment-heading">
          <Translate contentKey="landexpApp.payment.home.title">Payments</Translate>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('landexpApp.payment.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
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
                  <Translate contentKey="landexpApp.payment.paymentStatus">Payment Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createAt')}>
                  <Translate contentKey="landexpApp.payment.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('updateAt')}>
                  <Translate contentKey="landexpApp.payment.updateAt">Update At</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.payment.house">House</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.payment.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentList.map((payment, i) => (
                <tr key={`entity-${i}`}>
                  <td style={{ color: 'red' }}>{payment.code}</td>
                  <td>{new Intl.NumberFormat().format(payment.money)} VNĐ</td>
                  <td>
                    {payment.paidTime ?
                      (
                          <TextFormat type="date" value={payment.paidTime} format={APP_LOCAL_DATE_FORMAT} />
                      ) : 'Chưa thanh toán'
                    }
                  </td>
                  <td>{getPaymentStatus(payment.paymentStatus)}</td>
                  <td>
                    <TextFormat type="date" value={payment.createAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={payment.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{payment.houseId ? <Link to={`house/${payment.houseId}`}>Xem tin</Link> : ''}</td>
                  <td>{payment.customerLogin ? payment.customerLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      {payment.paymentStatus === 'PENDING' || payment.paymentStatus === 'OPEN' ?
                        (
                          <Button tag={Link} to={`${match.url}/${payment.id}/approve`} color="warning" size="sm">
                            <FontAwesomeIcon icon="info" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.approve">Approve</Translate>
                            </span>
                          </Button>
                        ) : ''
                      }
                      {this.props.isManager ?
                        (
                          <Button tag={Link} to={`${match.url}/${payment.id}/edit`} color="info" size="sm">
                            <FontAwesomeIcon icon="edit" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                        ) : ''
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ payment, authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  paymentList: payment.entities,
  totalItems: payment.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
