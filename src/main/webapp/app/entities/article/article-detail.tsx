import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ArticleDetail extends React.Component<IArticleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { articleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="landexpApp.article.detail.title">Article</Translate> [<b>{articleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="avatar">
                <Translate contentKey="landexpApp.article.avatar">Avatar</Translate>
              </span>
            </dt>
            <dd>
              {articleEntity.avatar ? (
                <div>
                  <a onClick={openFile(articleEntity.avatarContentType, articleEntity.avatar)}>
                    <img src={`data:${articleEntity.avatarContentType};base64,${articleEntity.avatar}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {articleEntity.avatarContentType}, {byteSize(articleEntity.avatar)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="title">
                <Translate contentKey="landexpApp.article.title">Title</Translate>
              </span>
            </dt>
            <dd>{articleEntity.title}</dd>
            <dt>
              <span id="titleAlias">
                <Translate contentKey="landexpApp.article.titleAlias">Title Alias</Translate>
              </span>
            </dt>
            <dd>{articleEntity.titleAlias}</dd>
            <dt>
              <span id="summary">
                <Translate contentKey="landexpApp.article.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{articleEntity.summary}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="landexpApp.article.content">Content</Translate>
              </span>
            </dt>
            <dd>{articleEntity.content}</dd>
            <dt>
              <span id="statusType">
                <Translate contentKey="landexpApp.article.statusType">Status Type</Translate>
              </span>
            </dt>
            <dd>{articleEntity.statusType}</dd>
            <dt>
              <span id="hits">
                <Translate contentKey="landexpApp.article.hits">Hits</Translate>
              </span>
            </dt>
            <dd>{articleEntity.hits}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="landexpApp.article.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={articleEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateAt">
                <Translate contentKey="landexpApp.article.updateAt">Update At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={articleEntity.updateAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="landexpApp.article.category">Category</Translate>
            </dt>
            <dd>{articleEntity.categoryName ? articleEntity.categoryName : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.article.createBy">Create By</Translate>
            </dt>
            <dd>{articleEntity.createByLogin ? articleEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="landexpApp.article.updateBy">Update By</Translate>
            </dt>
            <dd>{articleEntity.updateByLogin ? articleEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/article" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/article/${articleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ article }: IRootState) => ({
  articleEntity: article.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
