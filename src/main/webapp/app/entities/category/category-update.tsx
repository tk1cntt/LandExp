import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './category.reducer';

export interface ICategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICategoryUpdateState {
  isNew: boolean;
}

export class CategoryUpdate extends React.Component<ICategoryUpdateProps, ICategoryUpdateState> {
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
      const { categoryEntity } = this.props;
      const entity = {
        ...categoryEntity,
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
    this.props.history.push('/quan-ly/danh-muc-tin-tuc');
  };

  render() {
    const isInvalid = false;
    const { categoryEntity, loading, updating } = this.props;
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
                  <Card title="Danh mục tin tức">
                    <AvForm model={isNew ? {} : categoryEntity} onSubmit={this.saveEntity}>
                      {!isNew ? (
                        <AvGroup>
                          <AvInput id="category-id" type="hidden" className="form-control" name="id" required readOnly />
                        </AvGroup>
                      ) : null}
                      <AvGroup>
                        <Label id="nameLabel" for="name">
                          <Translate contentKey="landexpApp.category.name">Name</Translate>
                        </Label>
                        <AvField id="category-name" type="text" name="name" />
                      </AvGroup>
                      <AvGroup>
                        <Label id="enabledLabel" check>
                          <AvInput id="category-enabled" type="checkbox" className="form-control" name="enabled" />
                          Danh mục tin tức (Tin tức hiển thị trên trang web thuộc danh mục này)
                        </Label>
                      </AvGroup>
                      <Button tag={Link} id="cancel-save" to="/quan-ly/danh-muc-tin-tuc" replace color="info">
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
  categoryEntity: storeState.category.entity,
  loading: storeState.category.loading,
  updating: storeState.category.updating
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
)(CategoryUpdate);
