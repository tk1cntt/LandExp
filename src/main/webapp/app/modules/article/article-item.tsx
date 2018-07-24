import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IArticleItemProp extends StateProps, DispatchProps {
  article: any;
}

export class ArticleItem extends React.Component<IArticleItemProp> {
  render() {
    return (
      <div className="col-md-3 post-item">
        <div className="item-thumbnail">
          <a href="#">
            <img src="/static/upload/products/item-1.png" />
          </a>
          <div className="type chothue">KINH TẾ ĐẦU TƯ</div>
        </div>
        <div className="item-info">
          <a href="#">
            <h3 className="title">Bí quyết để có một ngôi nhà đẹp</h3>
          </a>
          <p className="location">Satellite imagery appears to show Pyongyang has demolished buildings at the Sohae rocket launch site.</p>
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
