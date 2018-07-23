import './ArticleBox.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ImageGallery from 'react-image-gallery';

import { getLandType, getDirection, getMoney, encodeId, decodeId } from 'app/shared/util/utils';
import { getTopOfCategory3 } from 'app/entities/article/article.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import Loading from 'app/shared/layout/loading/loading';

export interface IArticleBoxProp extends StateProps, DispatchProps {}

export class ArticleBox extends React.Component<IArticleBoxProp> {
  componentDidMount() {
    this.props.getTopOfCategory3();
  }

  render() {
    return (
      <Row>
        <Container />
      </Row>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articleList: article.top3Entities,
  loading: article.loadingTop3
});

const mapDispatchToProps = { getTopOfCategory3 };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleBox);
