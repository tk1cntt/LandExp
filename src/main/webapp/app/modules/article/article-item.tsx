import './article.css';

import React from 'react';
import { connect } from 'react-redux';
import { encodeId } from 'app/shared/util/utils';
import { SERVER_API_URL } from 'app/config/constants';

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
      <div className="col-md-3 post-item">
        <div className="item-thumbnail">
          <a href="#">
            <img src={`${SERVER_API_URL}/api/articles/${encodeId(article.id)}/avatar/${article.link}-${encodeId(
              article.id
            )}.jpg`} />
          </a>
          <div className="type chothue">{this.props.article.categoryName}</div>
        </div>
        <div className="item-info">
          <a href="#">
            <h3 className="title">{this.props.article.title}</h3>
          </a>
          <p className="location"
            dangerouslySetInnerHTML={{ __html: this.props.article.summary }}
          />
        </div>
        <div className="clearfix" />
      </div>
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
