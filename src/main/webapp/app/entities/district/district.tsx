import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Icon } from 'antd';

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
import { getSearchEntities, getEntities } from './district.reducer';
import { IDistrict } from 'app/shared/model/district.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import SearchPage from 'app/modules/search/search-page';

export interface IDistrictProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDistrictState extends IPaginationBaseState {
  search: string;
}

export class District extends React.Component<IDistrictProps, IDistrictState> {
  state: IDistrictState = {
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
    const { districtList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage />
        <Container>
          <h2 id="district-heading">
            <Translate contentKey="landexpApp.district.home.title">Districts</Translate>
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />&nbsp;
              <Translate contentKey="landexpApp.district.home.createLabel">Create new District</Translate>
            </Link>
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
                      placeholder={translate('landexpApp.district.home.search')}
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
                  <th className="hand" onClick={this.sort('name')}>
                    <Translate contentKey="landexpApp.district.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="landexpApp.district.region">Region</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="landexpApp.district.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('enabled')}>
                    <Translate contentKey="landexpApp.district.enabled">Enabled</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('createAt')}>
                    <Translate contentKey="landexpApp.district.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('updateAt')}>
                    <Translate contentKey="landexpApp.district.updateAt">Update At</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {districtList.map((district, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{district.name}</td>
                    <td>{district.regionId ? <Link to={`region/${district.regionId}`}>{district.regionName}</Link> : ''}</td>
                    <td>{district.cityId ? <Link to={`city/${district.cityId}`}>{district.cityName}</Link> : ''}</td>
                    <td>
                      {district.enabled ? (
                        <Icon type="check-square" style={{ color: 'green' }} />
                      ) : (
                        <Icon type="close-square" style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <TextFormat type="date" value={district.createAt} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={district.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${district.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${district.id}/delete`} color="danger" size="sm">
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
          <Row className="justify-content-center">
            <JhiPagination
              items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
            />
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ district }: IRootState) => ({
  districtList: district.entities,
  totalItems: district.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(District);
