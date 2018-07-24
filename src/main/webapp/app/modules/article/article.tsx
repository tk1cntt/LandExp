import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';

import { getEntities } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import HomeNewsBox from 'app/modules/home/home-newsbox';

import ArticleBox from './article-box';
import ArticleItem from './article-item';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class Article extends React.Component<IArticleProp> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    return (
      <Row>
        <Container className="article">
          <HomeNewsBox />
          <Row>
            <Row>
              <div className="gridview">
                {this.props.articleList.map((article, i) => (
                  <ArticleItem key={`article-id-${i}`} article={article} />
                ))}
              </div>
            </Row>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articleList: article.entities,
  loading: article.loading
});

const mapDispatchToProps = { getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
