import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWard } from 'app/shared/model/ward.model';
import { getEntities as getWards } from 'app/entities/ward/ward.reducer';
import { getEntity, updateEntity, createEntity, reset } from './street.reducer';
import { IStreet } from 'app/shared/model/street.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IStreetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IStreetUpdateState {
  isNew: boolean;
  wardId: number;
}

export class StreetUpdate extends React.Component<IStreetUpdateProps, IStreetUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      wardId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getWards();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { streetEntity } = this.props;
      const entity = {
        ...streetEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/street');
  };

  wardUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        wardId: -1
      });
    } else {
      for (const i in this.props.wards) {
        if (id === this.props.wards[i].id.toString()) {
          this.setState({
            wardId: this.props.wards[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { streetEntity, wards, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="landexpApp.street.home.createOrEditLabel">
              <Translate contentKey="landexpApp.street.home.createOrEditLabel">Create or edit a Street</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : streetEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="street-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="landexpApp.street.name">Name</Translate>
                  </Label>
                  <AvField id="street-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="postalCode">
                    <Translate contentKey="landexpApp.street.postalCode">Postal Code</Translate>
                  </Label>
                  <AvField id="street-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="stateProvinceLabel" for="stateProvince">
                    <Translate contentKey="landexpApp.street.stateProvince">State Province</Translate>
                  </Label>
                  <AvField id="street-stateProvince" type="text" name="stateProvince" />
                </AvGroup>
                <AvGroup>
                  <Label id="enabledLabel" check>
                    <AvInput id="street-enabled" type="checkbox" className="form-control" name="enabled" />
                    <Translate contentKey="landexpApp.street.enabled">Enabled</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createAtLabel" for="createAt">
                    <Translate contentKey="landexpApp.street.createAt">Create At</Translate>
                  </Label>
                  <AvField id="street-createAt" type="date" className="form-control" name="createAt" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateAtLabel" for="updateAt">
                    <Translate contentKey="landexpApp.street.updateAt">Update At</Translate>
                  </Label>
                  <AvField id="street-updateAt" type="date" className="form-control" name="updateAt" />
                </AvGroup>
                <AvGroup>
                  <Label for="ward.id">
                    <Translate contentKey="landexpApp.street.ward">Ward</Translate>
                  </Label>
                  <AvInput id="street-ward" type="select" className="form-control" name="wardId" onChange={this.wardUpdate}>
                    <option value="" key="0" />
                    {wards
                      ? wards.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/street" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  wards: storeState.ward.entities,
  streetEntity: storeState.street.entity,
  loading: storeState.street.loading,
  updating: storeState.street.updating
});

const mapDispatchToProps = {
  getWards,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StreetUpdate);
