import './article.css';

import React from 'react';
import Loadable from 'react-loadable';
import { Switch, RouteComponentProps } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, Icon } from 'antd';

import { getEntities } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import ArticleHeader from './article-header';

import ArticleList from './article-list';
import ArticleDetail from './article-detail';
import ArticleSide from './article-side';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class Article extends React.Component<IArticleProp> {
  componentDidMount() {
    this.props.getEntities();
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
              <Breadcrumb.Item>
                <span>Tin tức</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="container">
          <Col md={18}>
            <ArticleList />
          </Col>
          <Col md={6}>
            <ArticleSide />
          </Col>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articleList: article.entities,
  loading: article.loading
});

const mapDispatchToProps = { getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
