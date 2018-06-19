import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDistrict } from 'app/shared/model/district.model';
import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ward.reducer';
import { IWard } from 'app/shared/model/ward.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IWardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IWardUpdateState {
  isNew: boolean;
  districtId: number;
  districtId: number;
}

export class WardUpdate extends React.Component<IWardUpdateProps, IWardUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      districtId: 0,
      districtId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDistricts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { wardEntity } = this.props;
      const entity = {
        ...wardEntity,
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
    this.props.history.push('/entity/ward');
  };

  districtUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        districtId: -1
      });
    } else {
      for (const i in this.props.districts) {
        if (id === this.props.districts[i].id.toString()) {
          this.setState({
            districtId: this.props.districts[i].id
          });
        }
      }
    }
  };

  districtUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        districtId: -1
      });
    } else {
      for (const i in this.props.districts) {
        if (name === this.props.districts[i].name.toString()) {
          this.setState({
            districtId: this.props.districts[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { wardEntity, districts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="landexpApp.ward.home.createOrEditLabel">
              <Translate contentKey="landexpApp.ward.home.createOrEditLabel">Create or edit a Ward</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : wardEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ward-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="landexpApp.ward.name">Name</Translate>
                  </Label>
                  <AvField id="ward-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="enabledLabel" check>
                    <AvInput id="ward-enabled" type="checkbox" className="form-control" name="enabled" />
                    <Translate contentKey="landexpApp.ward.enabled">Enabled</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createAtLabel" for="createAt">
                    <Translate contentKey="landexpApp.ward.createAt">Create At</Translate>
                  </Label>
                  <AvField id="ward-createAt" type="date" className="form-control" name="createAt" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateAtLabel" for="updateAt">
                    <Translate contentKey="landexpApp.ward.updateAt">Update At</Translate>
                  </Label>
                  <AvField id="ward-updateAt" type="date" className="form-control" name="updateAt" />
                </AvGroup>
                <AvGroup>
                  <Label for="district.id">
                    <Translate contentKey="landexpApp.ward.district">District</Translate>
                  </Label>
                  <AvInput id="ward-district" type="select" className="form-control" name="districtId" onChange={this.districtUpdate}>
                    <option value="" key="0" />
                    {districts
                      ? districts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="district.name">
                    <Translate contentKey="landexpApp.ward.district">District</Translate>
                  </Label>
                  <AvInput id="ward-district" type="select" className="form-control" name="districtId" onChange={this.districtUpdate}>
                    <option value="" key="0" />
                    {districts
                      ? districts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ward" replace color="info">
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
  districts: storeState.district.entities,
  wardEntity: storeState.ward.entity,
  loading: storeState.ward.loading,
  updating: storeState.ward.updating
});

const mapDispatchToProps = {
  getDistricts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WardUpdate);
