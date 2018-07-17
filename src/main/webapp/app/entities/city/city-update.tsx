import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { Card } from 'antd';
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { getEntity, updateEntity, createEntity, reset } from './city.reducer';
// tslint:disable-next-line:no-unused-variable

export interface ICityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICityUpdateState {
  isNew: boolean;
}

export class CityUpdate extends React.Component<ICityUpdateProps, ICityUpdateState> {
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
      const { cityEntity } = this.props;
      const entity = {
        ...cityEntity,
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
    this.props.history.push('/quan-ly/tinh-thanh');
  };

  render() {
    const isInvalid = false;
    const { cityEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              <Row>
                {this.props.loading ? (
                  <Loading />
                ) : (
                  <Card title="Thông tin tỉnh thành">
                    <Col md="12">
                      <AvForm model={isNew ? {} : cityEntity} onSubmit={this.saveEntity}>
                        {!isNew ? (
                          <AvGroup>
                            <Label for="id">
                              <Translate contentKey="global.field.id">ID</Translate>
                            </Label>
                            <AvInput id="city-id" type="text" className="form-control" name="id" required readOnly />
                          </AvGroup>
                        ) : null}
                        <AvGroup>
                          <Label id="nameLabel" for="name">
                            <Translate contentKey="landexpApp.city.name">Name</Translate>
                          </Label>
                          <AvField id="city-name" type="text" name="name" />
                        </AvGroup>
                        <AvGroup>
                          <Label id="indexLabel" for="index">
                            <Translate contentKey="landexpApp.city.index">Index</Translate>
                          </Label>
                          <AvField id="city-index" type="number" className="form-control" name="index" />
                        </AvGroup>
                        <AvGroup>
                          <Label id="enabledLabel" check>
                            <AvInput id="city-enabled" type="checkbox" className="form-control" name="enabled" />
                            <Translate contentKey="landexpApp.city.enabled">Enabled</Translate>
                          </Label>
                        </AvGroup>
                        <Button tag={Link} id="cancel-save" to="/quan-ly/tinh-thanh" replace color="info">
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
                  </Card>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  cityEntity: storeState.city.entity,
  loading: storeState.city.loading,
  updating: storeState.city.updating
});

const mapDispatchToProps = {
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
)(CityUpdate);
