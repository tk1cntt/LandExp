import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './service-fee.reducer';
import { IServiceFee } from 'app/shared/model/service-fee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';
import { getSaleType } from 'app/shared/util/utils';

export interface IServiceFeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IServiceFeeUpdateState {
  isNew: boolean;
}

export class ServiceFeeUpdate extends React.Component<IServiceFeeUpdateProps, IServiceFeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { serviceFeeEntity } = this.props;
      const entity = {
        ...serviceFeeEntity,
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
    this.props.history.push('/quan-ly/bang-phi-dich-vu');
  };

  render() {
    const isInvalid = false;
    const { serviceFeeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="12">
            <h2 id="landexpApp.serviceFee.home.createOrEditLabel">
              <Translate contentKey="landexpApp.serviceFee.home.createOrEditLabel">Create or edit a ServiceFee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="12">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : serviceFeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="service-fee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="saleTypeLabel">
                    <Translate contentKey="landexpApp.serviceFee.saleType">Sale Type</Translate>
                  </Label>
                  <AvInput
                    id="service-fee-saleType"
                    type="select"
                    className="form-control"
                    name="saleType"
                    value={(!isNew && serviceFeeEntity.saleType) || 'SALE_BY_MYSELF'}
                  >
                    <option value="SALE_BY_MYSELF">{getSaleType('SALE_BY_MYSELF')}</option>
                    <option value="SALE_BY_MYSELF_VIP">{getSaleType('SALE_BY_MYSELF_VIP')}</option>
                    <option value="SALE_SUPPORT">{getSaleType('SALE_SUPPORT')}</option>
                    <option value="SALE_SUPPORT_VIP">{getSaleType('SALE_SUPPORT_VIP')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="feeLabel" for="fee">
                    <Translate contentKey="landexpApp.serviceFee.fee">Fee</Translate>
                  </Label>
                  <AvField id="service-fee-fee" type="number" className="form-control" name="fee" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/quan-ly/bang-phi-dich-vu" replace color="info">
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
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  serviceFeeEntity: storeState.serviceFee.entity,
  loading: storeState.serviceFee.loading,
  updating: storeState.serviceFee.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFeeUpdate);
