import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Container, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './service-fee.reducer';
// tslint:disable-next-line:no-unused-variable
import { getSaleType } from 'app/shared/util/utils';

export interface IServiceFeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ServiceFee extends React.Component<IServiceFeeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { serviceFeeList, match } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Col md="12">
            {this.props.loading ? (
              <Loading />
            ) : (
              <Card title="Bảng phí dịch vụ">
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
              </Card>
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
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceFee);
