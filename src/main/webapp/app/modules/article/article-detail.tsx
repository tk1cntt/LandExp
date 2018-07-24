import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';

import { decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import HomeNewsBox from 'app/modules/home/home-newsbox';

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
          <Row>
            <div className="col-md-9">
              <h1>Macron aide: French MPs grill minister in beating row</h1>
              <div className="summary">
                France's interior minister has been grilled by MPs over his handling of a policing scandal in which a presidential security
                aide was filmed assaulting a demonstrator on 1 May.
              </div>
              <div className="content">
                <p>
                  Gérard Collomb said he learned of the video on 2 May and did not report it to prosecutors because it was a matter for
                  President Emmanuel Macron's staff.
                </p>
                <p>Mr Macron fired the aide, Alexandre Benalla, on Friday, but MPs want to know why he did not act sooner.</p>
                <p>Mr Benalla, 26, faces several charges.</p>
                <p>
                  He is accused of assault with an accomplice, interfering in police work, impersonating a police officer and illegally
                  receiving surveillance footage.
                </p>
                <p>
                  On Monday Mr Benalla, who was Mr Macron's top bodyguard during last year's election campaign, defended his actions,
                  claiming that he was "lending a hand" to the riot officers at the scene after he was "invited to observe" their
                  operations.
                </p>
              </div>
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
