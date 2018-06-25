import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IPayment } from 'app/shared/model/payment.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, approveEntity } from './payment.reducer';

export interface IPaymentDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PaymentDeleteDialog extends React.Component<IPaymentDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmApprove = event => {
    /* tslint:disable-next-line */
    this.props.approveEntity(this.props.paymentEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { paymentEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.approve.title">Confirm approve operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="landexpApp.payment.approve.question" interpolate={{ id: paymentEntity.code }}>
            Are you sure you want to approve this Payment?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="warning" onClick={this.confirmApprove}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            <Translate contentKey="entity.action.approve">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ payment }: IRootState) => ({
  paymentEntity: payment.entity
});

const mapDispatchToProps = { getEntity, approveEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDeleteDialog);
