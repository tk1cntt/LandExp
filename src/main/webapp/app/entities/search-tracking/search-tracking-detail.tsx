import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './search-tracking.reducer';
import { ISearchTracking } from 'app/shared/model/search-tracking.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISearchTrackingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class SearchTrackingDetail extends React.Component<ISearchTrackingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { searchTrackingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="landexpApp.searchTracking.detail.title">SearchTracking</Translate> [<b>{searchTrackingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="actionType">
                <Translate contentKey="landexpApp.searchTracking.actionType">Action Type</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.actionType}</dd>
            <dt>
              <span id="keyword">
                <Translate contentKey="landexpApp.searchTracking.keyword">Keyword</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.keyword}</dd>
            <dt>
              <span id="costFrom">
                <Translate contentKey="landexpApp.searchTracking.costFrom">Cost From</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.costFrom}</dd>
            <dt>
              <span id="costTo">
                <Translate contentKey="landexpApp.searchTracking.costTo">Cost To</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.costTo}</dd>
            <dt>
              <span id="acreageFrom">
                <Translate contentKey="landexpApp.searchTracking.acreageFrom">Acreage From</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.acreageFrom}</dd>
            <dt>
              <span id="acreageTo">
                <Translate contentKey="landexpApp.searchTracking.acreageTo">Acreage To</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.acreageTo}</dd>
            <dt>
              <span id="direction">
                <Translate contentKey="landexpApp.searchTracking.direction">Direction</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.direction}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="landexpApp.searchTracking.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.floor}</dd>
            <dt>
              <span id="bathRoom">
                <Translate contentKey="landexpApp.searchTracking.bathRoom">Bath Room</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.bathRoom}</dd>
            <dt>
              <span id="bedRoom">
                <Translate contentKey="landexpApp.searchTracking.bedRoom">Bed Room</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.bedRoom}</dd>
            <dt>
              <span id="parking">
                <Translate contentKey="landexpApp.searchTracking.parking">Parking</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.parking ? 'true' : 'false'}</dd>
            <dt>
              <span id="landType">
                <Translate contentKey="landexpApp.searchTracking.landType">Land Type</Translate>
              </span>
            </dt>
            <dd>{searchTrackingEntity.landType}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="landexpApp.searchTracking.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={searchTrackingEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="landexpApp.searchTracking.user">User</Translate>
            </dt>
            <dd>{searchTrackingEntity.userLogin ? searchTrackingEntity.userLogin : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.searchTracking.city">City</Translate>
            </dt>
            <dd>{searchTrackingEntity.cityName ? searchTrackingEntity.cityName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.searchTracking.district">District</Translate>
            </dt>
            <dd>{searchTrackingEntity.districtName ? searchTrackingEntity.districtName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.searchTracking.street">Street</Translate>
            </dt>
            <dd>{searchTrackingEntity.streetName ? searchTrackingEntity.streetName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/search-tracking" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/search-tracking/${searchTrackingEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ searchTracking }: IRootState) => ({
  searchTrackingEntity: searchTracking.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SearchTrackingDetail);
