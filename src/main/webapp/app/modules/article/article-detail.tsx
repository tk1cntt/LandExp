import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ImageGallery from 'react-image-gallery';

import { getLandType, getDirection, getMoney, encodeId, decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/article/article.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import HomeNewsBox from 'app/modules/home/home-newsbox';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> {}

export interface IArticleState {
  search: string;
  photoIndex: any;
}

export class Article extends React.Component<IArticleProp, IArticleState> {
  state: IArticleState = {
    search: null,
    photoIndex: 0
  };

  componentDidMount() {
    const articleId = decodeId(this.props.match.params.id);
    this.props.getEntity(articleId);
  }

  render() {
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          {this.props.loading ? (
            <Loading />
          ) : (
            <>
              <HomeNewsBox />
              <Row />
            </>
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
