import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { encodeId } from 'app/shared/util/utils';
import { SERVER_API_URL } from 'app/config/constants';
import { getTopEntities } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomeNewsBox extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getTopEntities();
  }

  render() {
    return (
      <div className="featured-posts">
        <h2>
          Tin mới<span>Thứ 5, ngày 31 tháng 05 năm 2018</span>
        </h2>
        {this.props.loading ? (
          <Loading />
        ) : (
          <ul>
            {this.props.articleList.map((article, i) => (
              <li key={`artivle-id-${i}`} className={`article-id-${i}`}>
                <Link to={`/tin-tuc-chi-tiet/${encodeId(article.id)}/${article.link}`}>
                  <img src={`${SERVER_API_URL}/api/articles/${encodeId(article.id)}/avatar/${article.link}-${encodeId(article.id)}.jpg`} />
                  <div className="caption">
                    <div className="caption-content">
                      <p>
                        <a href={`/tin-tuc-chi-tiet/${encodeId(article.id)}/${article.link}`} className="post-title">
                          {article.title}
                        </a>
                      </p>
                      <p className="border-left-red cat-title">
                        <a href="" dangerouslySetInnerHTML={{ __html: article.categoryName }} />
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  articleList: storeState.article.topEntities,
  loading: storeState.article.loading
});

const mapDispatchToProps = { getTopEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeNewsBox);
