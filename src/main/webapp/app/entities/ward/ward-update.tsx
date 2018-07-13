import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ward.reducer';
// tslint:disable-next-line:no-unused-variable
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IWardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> { }

export interface IWardUpdateState {
  isNew: boolean;
  districtId: number;
}

export class WardUpdate extends React.Component<IWardUpdateProps, IWardUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.history.push('/quan-ly/xa-phuong');
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

  render() {
    const isInvalid = false;
    const { wardEntity, districts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Col md="12">
            {this.props.loading ? <Loading /> : (
              <>
                <h2 id="landexpApp.ward.home.createOrEditLabel">
                  <Translate contentKey="landexpApp.ward.home.createOrEditLabel">Create or edit a Ward</Translate>
                </h2>
                <Col md="12">
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
                      <Label for="district.id">
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
                    <Button tag={Link} id="cancel-save" to="/quan-ly/xa-phuong" replace color="info">
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
                </Col>
              </>
            )}
          </Col>
        </Container>
      </Row>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WardUpdate);
