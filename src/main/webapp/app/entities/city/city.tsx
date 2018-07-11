import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Icon, Spin } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface ICityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICityState {
  search: string;
}

export class City extends React.Component<ICityProps, ICityState> {
  state: ICityState = {
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
    const { cityList, match } = this.props;
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
                <h2 id="city-heading">
                  <Translate contentKey="landexpApp.city.home.title">Cities</Translate>
                </h2>
                <div className="table-responsive">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <Translate contentKey="landexpApp.city.name">Name</Translate>
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.city.enabled">Enabled</Translate>
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.city.createAt">Create At</Translate>
                        </th>
                        <th>
                          <Translate contentKey="landexpApp.city.updateAt">Update At</Translate>
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {cityList.map((city, i) => (
                        <tr key={`entity-${i}`}>
                          <td>{city.name}</td>
                          <td>
                            {city.enabled ? (
                              <Icon type="check-square" style={{ color: 'green' }} />
                            ) : (
                              <Icon type="close-square" style={{ color: 'red' }} />
                            )}
                          </td>
                          <td>
                            <TextFormat type="date" value={city.createAt} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                          <td>
                            <TextFormat type="date" value={city.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`${match.url}/${city.id}/edit`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit">Edit</Translate>
                                </span>
                              </Button>
                              <Button tag={Link} to={`${match.url}/${city.id}/delete`} color="danger" size="sm">
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.delete">Delete</Translate>
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

const mapStateToProps = ({ city }: IRootState) => ({
  cityList: city.entities,
  loading: city.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(City);
