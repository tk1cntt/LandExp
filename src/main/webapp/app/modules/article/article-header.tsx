import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, Icon } from 'antd';

import { getTopList } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';
import Header from 'app/shared/layout/header/header';

export interface IArticleHeaderProp extends StateProps, DispatchProps {}

export class ArticleHeader extends React.Component<IArticleHeaderProp> {
  componentDidMount() {}

  render() {
    return (
      <header className="article">
        <div className="container">
          <Header />
        </div>
        <h2 className="header-title">Tin tức</h2>
        <Row>
          <Col lg={{ span: 14, offset: 5 }}>
            <p className="text-center">
              Thông tin cập nhật về thị trường Bất động sản cùng những bình luận, phân tích chuyên sâu giúp bạn có góc nhìn toàn diện và đa
              chiều về thị trường Bất động sản hiện nay.
            </p>
          </Col>
        </Row>
      </header>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articleList: article.topListEntities,
  loading: article.loadingTopList
});

const mapDispatchToProps = { getTopList };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleHeader);
