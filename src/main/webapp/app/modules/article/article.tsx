import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ImageGallery from 'react-image-gallery';

import { getLandType, getDirection, getMoney, encodeId, decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
// import GoogleMaps from 'app/shared/util/google-maps';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> {}

export interface IArticleState {
  search: string;
  isOpen: Boolean;
  photoIndex: any;
}

export class Article extends React.Component<IArticleProp, IArticleState> {
  state: IArticleState = {
    search: null,
    isOpen: false,
    photoIndex: 0
  };

  componentDidMount() {
    const houseId = decodeId(this.props.match.params.id);
    this.props.getEntity(houseId);
  }

  houseImageGalleryFrom(images: any) {
    return (
      <Col md="6">
        <div style={{ border: '1px solid #dfdfdf' }}>
          <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} autoPlay lazyLoad />
        </div>
      </Col>
    );
  }

  render() {
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>{this.props.loading ? <Loading /> : <Row>{this.props.articleEntity.content}</Row>}</Container>
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
