import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './house.reducer';
import { IHouse } from 'app/shared/model/house.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHouseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IHouseState = IPaginationBaseState;

export class House extends React.Component<IHouseProps, IHouseState> {
  state: IHouseState = {
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

  render() {
    const { houseList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="house-heading">
          <Translate contentKey="landexpApp.house.home.title">Houses</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="landexpApp.house.home.createLabel">Create new House</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('avatar')}>
                  <Translate contentKey="landexpApp.house.avatar">Avatar</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('avatarLink')}>
                  <Translate contentKey="landexpApp.house.avatarLink">Avatar Link</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('actionType')}>
                  <Translate contentKey="landexpApp.house.actionType">Action Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('address')}>
                  <Translate contentKey="landexpApp.house.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('money')}>
                  <Translate contentKey="landexpApp.house.money">Money</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('acreage')}>
                  <Translate contentKey="landexpApp.house.acreage">Acreage</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('acreageStreetSide')}>
                  <Translate contentKey="landexpApp.house.acreageStreetSide">Acreage Street Side</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('discount')}>
                  <Translate contentKey="landexpApp.house.discount">Discount</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('direction')}>
                  <Translate contentKey="landexpApp.house.direction">Direction</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('directionBalcony')}>
                  <Translate contentKey="landexpApp.house.directionBalcony">Direction Balcony</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('floor')}>
                  <Translate contentKey="landexpApp.house.floor">Floor</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('numberOfFloor')}>
                  <Translate contentKey="landexpApp.house.numberOfFloor">Number Of Floor</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('bathRoom')}>
                  <Translate contentKey="landexpApp.house.bathRoom">Bath Room</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('bedRoom')}>
                  <Translate contentKey="landexpApp.house.bedRoom">Bed Room</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('parking')}>
                  <Translate contentKey="landexpApp.house.parking">Parking</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('summary')}>
                  <Translate contentKey="landexpApp.house.summary">Summary</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('landType')}>
                  <Translate contentKey="landexpApp.house.landType">Land Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('saleType')}>
                  <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fee')}>
                  <Translate contentKey="landexpApp.house.fee">Fee</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('feeMax')}>
                  <Translate contentKey="landexpApp.house.feeMax">Fee Max</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('present')}>
                  <Translate contentKey="landexpApp.house.present">Present</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('hits')}>
                  <Translate contentKey="landexpApp.house.hits">Hits</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('customer')}>
                  <Translate contentKey="landexpApp.house.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('mobile')}>
                  <Translate contentKey="landexpApp.house.mobile">Mobile</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('email')}>
                  <Translate contentKey="landexpApp.house.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('facebook')}>
                  <Translate contentKey="landexpApp.house.facebook">Facebook</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('zalo')}>
                  <Translate contentKey="landexpApp.house.zalo">Zalo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('statusType')}>
                  <Translate contentKey="landexpApp.house.statusType">Status Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('googleId')}>
                  <Translate contentKey="landexpApp.house.googleId">Google Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('latitude')}>
                  <Translate contentKey="landexpApp.house.latitude">Latitude</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('longitude')}>
                  <Translate contentKey="landexpApp.house.longitude">Longitude</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createAt')}>
                  <Translate contentKey="landexpApp.house.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('updateAt')}>
                  <Translate contentKey="landexpApp.house.updateAt">Update At</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.house.city">City</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.house.district">District</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.house.ward">Ward</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.house.project">Project</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.house.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="landexpApp.house.updateBy">Update By</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {houseList.map((house, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${house.id}`} color="link" size="sm">
                      {house.id}
                    </Button>
                  </td>
                  <td>
                    {house.avatar ? (
                      <div>
                        <a onClick={openFile(house.avatarContentType, house.avatar)}>
                          <img src={`data:${house.avatarContentType};base64,${house.avatar}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {house.avatarContentType}, {byteSize(house.avatar)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{house.avatarLink}</td>
                  <td>{house.actionType}</td>
                  <td>{house.address}</td>
                  <td>{house.money}</td>
                  <td>{house.acreage}</td>
                  <td>{house.acreageStreetSide}</td>
                  <td>{house.discount}</td>
                  <td>{house.direction}</td>
                  <td>{house.directionBalcony}</td>
                  <td>{house.floor}</td>
                  <td>{house.numberOfFloor}</td>
                  <td>{house.bathRoom}</td>
                  <td>{house.bedRoom}</td>
                  <td>{house.parking ? 'true' : 'false'}</td>
                  <td>{house.summary}</td>
                  <td>{house.landType}</td>
                  <td>{house.saleType}</td>
                  <td>{house.fee}</td>
                  <td>{house.feeMax}</td>
                  <td>{house.present}</td>
                  <td>{house.hits}</td>
                  <td>{house.customer}</td>
                  <td>{house.mobile}</td>
                  <td>{house.email}</td>
                  <td>{house.facebook}</td>
                  <td>{house.zalo}</td>
                  <td>{house.statusType}</td>
                  <td>{house.googleId}</td>
                  <td>{house.latitude}</td>
                  <td>{house.longitude}</td>
                  <td>
                    <TextFormat type="date" value={house.createAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={house.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{house.cityName ? <Link to={`city/${house.cityId}`}>{house.cityName}</Link> : ''}</td>
                  <td>{house.districtName ? <Link to={`district/${house.districtId}`}>{house.districtName}</Link> : ''}</td>
                  <td>{house.wardName ? <Link to={`ward/${house.wardId}`}>{house.wardName}</Link> : ''}</td>
                  <td>{house.projectName ? <Link to={`landProject/${house.projectId}`}>{house.projectName}</Link> : ''}</td>
                  <td>{house.createByLogin ? house.createByLogin : ''}</td>
                  <td>{house.updateByLogin ? house.updateByLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${house.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${house.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${house.id}/delete`} color="danger" size="sm">
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
      </div>
    );
  }
}

const mapStateToProps = ({ house }: IRootState) => ({
  houseList: house.entities,
  totalItems: house.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(House);
