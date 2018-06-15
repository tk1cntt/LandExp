import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './house.reducer';
import { IHouse } from 'app/shared/model/house.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHouseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class HouseDetail extends React.Component<IHouseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { houseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="landexpApp.house.detail.title">House</Translate> [<b>{houseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="avatar">
                <Translate contentKey="landexpApp.house.avatar">Avatar</Translate>
              </span>
            </dt>
            <dd>{houseEntity.avatar}</dd>
            <dt>
              <span id="actionType">
                <Translate contentKey="landexpApp.house.actionType">Action Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.actionType}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="landexpApp.house.address">Address</Translate>
              </span>
            </dt>
            <dd>{houseEntity.address}</dd>
            <dt>
              <span id="money">
                <Translate contentKey="landexpApp.house.money">Money</Translate>
              </span>
            </dt>
            <dd>{houseEntity.money}</dd>
            <dt>
              <span id="moneyType">
                <Translate contentKey="landexpApp.house.moneyType">Money Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.moneyType}</dd>
            <dt>
              <span id="acreage">
                <Translate contentKey="landexpApp.house.acreage">Acreage</Translate>
              </span>
            </dt>
            <dd>{houseEntity.acreage}</dd>
            <dt>
              <span id="acreageStreetSide">
                <Translate contentKey="landexpApp.house.acreageStreetSide">Acreage Street Side</Translate>
              </span>
            </dt>
            <dd>{houseEntity.acreageStreetSide}</dd>
            <dt>
              <span id="discount">
                <Translate contentKey="landexpApp.house.discount">Discount</Translate>
              </span>
            </dt>
            <dd>{houseEntity.discount}</dd>
            <dt>
              <span id="direction">
                <Translate contentKey="landexpApp.house.direction">Direction</Translate>
              </span>
            </dt>
            <dd>{houseEntity.direction}</dd>
            <dt>
              <span id="directionBalcony">
                <Translate contentKey="landexpApp.house.directionBalcony">Direction Balcony</Translate>
              </span>
            </dt>
            <dd>{houseEntity.directionBalcony}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="landexpApp.house.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{houseEntity.floor}</dd>
            <dt>
              <span id="numberOfFloor">
                <Translate contentKey="landexpApp.house.numberOfFloor">Number Of Floor</Translate>
              </span>
            </dt>
            <dd>{houseEntity.numberOfFloor}</dd>
            <dt>
              <span id="bathRoom">
                <Translate contentKey="landexpApp.house.bathRoom">Bath Room</Translate>
              </span>
            </dt>
            <dd>{houseEntity.bathRoom}</dd>
            <dt>
              <span id="bedRoom">
                <Translate contentKey="landexpApp.house.bedRoom">Bed Room</Translate>
              </span>
            </dt>
            <dd>{houseEntity.bedRoom}</dd>
            <dt>
              <span id="parking">
                <Translate contentKey="landexpApp.house.parking">Parking</Translate>
              </span>
            </dt>
            <dd>{houseEntity.parking ? 'true' : 'false'}</dd>
            <dt>
              <span id="furniture">
                <Translate contentKey="landexpApp.house.furniture">Furniture</Translate>
              </span>
            </dt>
            <dd>{houseEntity.furniture ? 'true' : 'false'}</dd>
            <dt>
              <span id="summary">
                <Translate contentKey="landexpApp.house.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{houseEntity.summary}</dd>
            <dt>
              <span id="landType">
                <Translate contentKey="landexpApp.house.landType">Land Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.landType}</dd>
            <dt>
              <span id="saleType">
                <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.saleType}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="landexpApp.house.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{houseEntity.fee}</dd>
            <dt>
              <span id="feeMax">
                <Translate contentKey="landexpApp.house.feeMax">Fee Max</Translate>
              </span>
            </dt>
            <dd>{houseEntity.feeMax}</dd>
            <dt>
              <span id="present">
                <Translate contentKey="landexpApp.house.present">Present</Translate>
              </span>
            </dt>
            <dd>{houseEntity.present}</dd>
            <dt>
              <span id="hits">
                <Translate contentKey="landexpApp.house.hits">Hits</Translate>
              </span>
            </dt>
            <dd>{houseEntity.hits}</dd>
            <dt>
              <span id="customer">
                <Translate contentKey="landexpApp.house.customer">Customer</Translate>
              </span>
            </dt>
            <dd>{houseEntity.customer}</dd>
            <dt>
              <span id="mobile">
                <Translate contentKey="landexpApp.house.mobile">Mobile</Translate>
              </span>
            </dt>
            <dd>{houseEntity.mobile}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="landexpApp.house.email">Email</Translate>
              </span>
            </dt>
            <dd>{houseEntity.email}</dd>
            <dt>
              <span id="facebook">
                <Translate contentKey="landexpApp.house.facebook">Facebook</Translate>
              </span>
            </dt>
            <dd>{houseEntity.facebook}</dd>
            <dt>
              <span id="zalo">
                <Translate contentKey="landexpApp.house.zalo">Zalo</Translate>
              </span>
            </dt>
            <dd>{houseEntity.zalo}</dd>
            <dt>
              <span id="statusType">
                <Translate contentKey="landexpApp.house.statusType">Status Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.statusType}</dd>
            <dt>
              <span id="googleId">
                <Translate contentKey="landexpApp.house.googleId">Google Id</Translate>
              </span>
            </dt>
            <dd>{houseEntity.googleId}</dd>
            <dt>
              <span id="latitude">
                <Translate contentKey="landexpApp.house.latitude">Latitude</Translate>
              </span>
            </dt>
            <dd>{houseEntity.latitude}</dd>
            <dt>
              <span id="longitude">
                <Translate contentKey="landexpApp.house.longitude">Longitude</Translate>
              </span>
            </dt>
            <dd>{houseEntity.longitude}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="landexpApp.house.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={houseEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateAt">
                <Translate contentKey="landexpApp.house.updateAt">Update At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={houseEntity.updateAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="landexpApp.house.city">City</Translate>
            </dt>
            <dd>{houseEntity.cityName ? houseEntity.cityName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.house.district">District</Translate>
            </dt>
            <dd>{houseEntity.districtName ? houseEntity.districtName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.house.ward">Ward</Translate>
            </dt>
            <dd>{houseEntity.wardName ? houseEntity.wardName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.house.street">Street</Translate>
            </dt>
            <dd>{houseEntity.streetName ? houseEntity.streetName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.house.project">Project</Translate>
            </dt>
            <dd>{houseEntity.projectName ? houseEntity.projectName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.house.createBy">Create By</Translate>
            </dt>
            <dd>{houseEntity.createByLogin ? houseEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.house.updateBy">Update By</Translate>
            </dt>
            <dd>{houseEntity.updateByLogin ? houseEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/house" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/house/${houseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ house }: IRootState) => ({
  houseEntity: house.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HouseDetail);
