import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './service-fee.reducer';
import { IServiceFee } from 'app/shared/model/service-fee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getSaleType } from 'app/shared/util/utils';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IServiceFeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IServiceFeeState {
  search: string;
}

export class ServiceFee extends React.Component<IServiceFeeProps, IServiceFeeState> {
  state: IServiceFeeState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
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

  render() {
    const { serviceFeeList, match } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Col md="12">
            {this.props.loading ? (
              <div className="justify-content-center">
                <Spin tip="Đang cập nhật dữ liệu..." />
              </div>
            ) : (
              <>
                <h2 id="service-fee-heading">
                  <Translate contentKey="landexpApp.serviceFee.home.title">Service Fees</Translate>
                </h2>
                <div className="table-responsive">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <Translate contentKey="landexpApp.serviceFee.saleType">Sale Type</Translate>
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.serviceFee.fee">Fee</Translate>
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {serviceFeeList.map((serviceFee, i) => (
                        <tr key={`entity-${i}`}>
                          <td>{getSaleType(serviceFee.saleType)}</td>
                          <td>{new Intl.NumberFormat().format(serviceFee.fee)} VNĐ</td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`${match.url}/${serviceFee.id}/edit`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit">Edit</Translate>
                                </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </Col>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ serviceFee }: IRootState) => ({
  serviceFeeList: serviceFee.entities,
  loading: serviceFee.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFee);
