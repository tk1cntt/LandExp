import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, Icon } from 'antd';

import { getTopList } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';

export interface IArticleHeaderProp extends StateProps, DispatchProps {}

export class ArticleHeader extends React.Component<IArticleHeaderProp> {
  componentDidMount() {}

  render() {
    return (
      <div className="header">
        <h2 className="header-title">Tin tức</h2>
        <Row>
          <Col lg={{ span: 14, offset: 5 }}>
            <p className="text-center">
              Thông tin cập nhật về thị trường Bất động sản cùng những bình luận, phân tích chuyên sâu giúp bạn có góc nhìn toàn diện và đa
              chiều về thị trường Bất động sản hiện nay.
            </p>
          </Col>
        </Row>
        <div className="breadcrumb news">
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <Icon type="home" style={{ fontSize: '20px' }} />
                  <span>Trang chủ</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <span>Tin tức</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Application</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
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
)(ArticleHeader);
