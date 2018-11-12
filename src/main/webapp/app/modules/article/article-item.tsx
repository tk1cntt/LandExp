import './article.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { encodeId } from 'app/shared/util/utils';
import { SERVER_API_URL } from 'app/config/constants';
import { Row, Col } from 'antd';

import Loading from 'app/shared/layout/loading/loading';

export interface IArticleItemProp extends StateProps, DispatchProps {
  article: any;
}

export class ArticleItem extends React.Component<IArticleItemProp> {
  render() {
    const { article } = this.props;
    if (!article) {
      return <Loading />;
    }
    return (
      <Row className="item-container">
        <Col md={8} sm={6} className="article-image">
          <Link to={`/tin-tuc-chi-tiet/${encodeId(article.id)}/${article.link}`} className="overlay">
            <img src={`${SERVER_API_URL}/api/articles/${encodeId(article.id)}/avatar/${article.link}-${encodeId(article.id)}.jpg`} alt="" />
          </Link>
          <Link to="/category" className="cat-title border-left-red">
            {this.props.article.categoryName}
          </Link>
        </Col>
        <Col md={16} sm={18}>
          <div className="article-item">
            <h3>
              <Link to={`/tin-tuc-chi-tiet/${encodeId(article.id)}/${article.link}`}>{this.props.article.title}</Link>
            </h3>
            <p className="post-date">1 ngày trước</p>
            <div className="sort-content" dangerouslySetInnerHTML={{ __html: this.props.article.summary }} />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ article }) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleItem);
