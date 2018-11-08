import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { List, Avatar } from 'antd';

import { decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/article/article.reducer';

import Loading from 'app/shared/layout/loading/loading';

const data = [
  {
    image: '/static/upload/products/item-1.png',
    url: '/news',
    title: 'Bí quyết để có một ngôi nhà đẹp'
  },
  {
    image: '/static/upload/products/item-1.png',
    url: '/news',
    title: 'Giao dịch sôi động tại sự kiện mở bán tòa M1 - Mipec City View'
  },
  {
    image: '/static/upload/products/item-1.png',
    url: '/news',
    title: 'Lợi thế cạnh tranh của dự án Ramada by Wyndham Ha Long Bay View'
  },
  {
    image: '/static/upload/products/item-1.png',
    url: '/news',
    title: 'Hệ thống tiện ích hoàn chỉnh tại dự án cao cấp nhất khu Midtown'
  },
  {
    image: '/static/upload/products/item-1.png',
    url: '/news',
    title: 'Làm thế nào nhận diện căn hộ homestay phù hợp để kinh doanh'
  }
];

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
                <div className="list-news">
                  <h1>{this.props.articleEntity.title}</h1>
                  <div className="summary" dangerouslySetInnerHTML={{ __html: this.props.articleEntity.summary }} />
                  <div className="content" dangerouslySetInnerHTML={{ __html: this.props.articleEntity.content }} />
                </div>
              </div>
              <div className="col-md-3 right-menu">
                <div className="sidebar">
                  <h3 className="title">Tin mới</h3>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <a href={item.url}>
                              <Avatar size="large" shape="square" src={item.image} />
                            </a>
                          }
                          title={<a href={item.url}>{item.title}</a>}
                        />
                      </List.Item>
                    )}
                  />
                </div>
                <div className="sidebar">
                  <h3 className="title">Tin xem nhiều</h3>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <a href={item.url}>
                              <Avatar size="large" shape="square" src={item.image} />
                            </a>
                          }
                          title={<a href={item.url}>{item.title}</a>}
                        />
                      </List.Item>
                    )}
                  />
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
