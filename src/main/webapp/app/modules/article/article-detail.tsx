import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';

import { decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> {}

export class Article extends React.Component<IArticleProp> {
  componentDidMount() {
    const articleId = decodeId(this.props.match.params.id);
    this.props.getEntity(articleId);
  }

  render() {
    return (
      <Row className="article">
        <Container>
          {this.props.loading ? (
            <Loading />
          ) : (
            <Row>
              <div className="col-md-9">
                <h1>{this.props.articleEntity.title}</h1>
                <div className="summary" dangerouslySetInnerHTML={{ __html: this.props.articleEntity.summary }} />
                <div className="content" dangerouslySetInnerHTML={{ __html: this.props.articleEntity.content }} />
              </div>
              <div className="col-md-3 right-menu">
                <div className="article-item">
                  <div className="article-thumbnail">
                    <a href="#">
                      <img src="/static/upload/products/item-1.png" />
                    </a>
                  </div>
                  <div className="article-info">
                    <a href="#">
                      <h3 className="title">Bí quyết để có một ngôi nhà đẹp</h3>
                    </a>
                    <p className="location">KINH TẾ ĐẦU TƯ</p>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="article-item">
                  <div className="article-thumbnail">
                    <a href="#">
                      <img src="/static/upload/products/item-1.png" />
                    </a>
                  </div>
                  <div className="article-info">
                    <a href="#">
                      <h3 className="title">Bí quyết để có một ngôi nhà đẹp</h3>
                    </a>
                    <p className="location">KINH TẾ ĐẦU TƯ</p>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="article-item">
                  <div className="article-thumbnail">
                    <a href="#">
                      <img src="/static/upload/products/item-1.png" />
                    </a>
                  </div>
                  <div className="article-info">
                    <a href="#">
                      <h3 className="title">Bí quyết để có một ngôi nhà đẹp</h3>
                    </a>
                    <p className="location">KINH TẾ ĐẦU TƯ</p>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="article-item">
                  <div className="article-thumbnail">
                    <a href="#">
                      <img src="/static/upload/products/item-1.png" />
                    </a>
                  </div>
                  <div className="article-info">
                    <a href="#">
                      <h3 className="title">Bí quyết để có một ngôi nhà đẹp</h3>
                    </a>
                    <p className="location">KINH TẾ ĐẦU TƯ</p>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </Row>
          )}
        </Container>
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
