import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ImageGallery from 'react-image-gallery';

import { getLandType, getDirection, getMoney, encodeId, decodeId } from 'app/shared/util/utils';
import { getTopList } from 'app/entities/article/article.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import Loading from 'app/shared/layout/loading/loading';

export interface IArticleBoxProp extends StateProps, DispatchProps {
  title: any;
  contents: any;
}

export class ArticleBox extends React.Component<IArticleBoxProp> {
  componentDidMount() {}

  render() {
    return (
      <Row>
        <div className="gridview">
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
              <p className="location">
                Satellite imagery appears to show Pyongyang has demolished buildings at the Sohae rocket launch site.
              </p>
            </div>
            <div className="clearfix" />
          </div>
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
              <p className="location">
                Satellite imagery appears to show Pyongyang has demolished buildings at the Sohae rocket launch site.
              </p>
            </div>
            <div className="clearfix" />
          </div>
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
              <p className="location">
                Satellite imagery appears to show Pyongyang has demolished buildings at the Sohae rocket launch site.
              </p>
            </div>
            <div className="clearfix" />
          </div>
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
              <p className="location">
                Satellite imagery appears to show Pyongyang has demolished buildings at the Sohae rocket launch site.
              </p>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </Row>
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
)(ArticleBox);
