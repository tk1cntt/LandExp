// tslint:disable-next-line jsx-no-lambda

import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, List, Icon, Avatar } from 'antd';

import { decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';
import ArticleHeader from './article-header';
import ArticleSide from './article-side';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> {}

export class Article extends React.Component<IArticleProp> {
  componentDidMount() {
    const articleId = decodeId(this.props.match.params.id);
    this.props.getEntity(articleId);
  }

  listItem(item: any) {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={
            <a href={item.url}>
              <Avatar size="large" shape="square" src={item.image} />
            </a>
          }
          title={<a href={item.url}>{item.title}</a>}
        />
      </List.Item>
    );
  }

  render() {
    return (
      <Row>
        <ArticleHeader />
        <div className="breadcrumb article">
          <div className="container">
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <Icon type="home" style={{ fontSize: '20px' }} />
                <span>Trang chủ</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/#/tin-tuc">
                <span>Tin tức</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{this.props.articleEntity.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        {this.props.loading ? (
          <Loading />
        ) : (
          <div className="container">
            <Col md={18}>
              <div className="list-article">
                <h2>{this.props.articleEntity.title}</h2>
                <div className="summary" dangerouslySetInnerHTML={{ __html: this.props.articleEntity.summary }} />
                <div className="content" dangerouslySetInnerHTML={{ __html: this.props.articleEntity.content }} />
              </div>
            </Col>
            <Col md={6}>
              <ArticleSide />
            </Col>
          </div>
        )}
      </Row>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articleEntity: article.entity,
  loading: article.loading
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
