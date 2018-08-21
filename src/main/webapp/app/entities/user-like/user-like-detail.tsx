import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-like.reducer';
import { IUserLike } from 'app/shared/model/user-like.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserLikeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class UserLikeDetail extends React.Component<IUserLikeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userLikeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="landexpApp.userLike.detail.title">UserLike</Translate> [<b>{userLikeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createAt">
                <Translate contentKey="landexpApp.userLike.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={userLikeEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="landexpApp.userLike.house">House</Translate>
            </dt>
            <dd>{userLikeEntity.houseId ? userLikeEntity.houseId : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.userLike.user">User</Translate>
            </dt>
            <dd>{userLikeEntity.userLogin ? userLikeEntity.userLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-like" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/user-like/${userLikeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userLike }: IRootState) => ({
  userLikeEntity: userLike.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLikeDetail);
