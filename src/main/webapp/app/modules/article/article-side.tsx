import React, { Component } from 'react';
import { Row, List, Avatar } from 'antd';

const data = [
  { image: '/static/upload/products/item-1.png', url: '/news', title: 'Bí quyết để có một ngôi nhà đẹp' },
  { image: '/static/upload/products/item-1.png', url: '/news', title: 'Giao dịch sôi động tại sự kiện mở bán tòa M1 - Mipec City View' },
  { image: '/static/upload/products/item-1.png', url: '/news', title: 'Lợi thế cạnh tranh của dự án Ramada by Wyndham Ha Long Bay View' },
  { image: '/static/upload/products/item-1.png', url: '/news', title: 'Hệ thống tiện ích hoàn chỉnh tại dự án cao cấp nhất khu Midtown' },
  { image: '/static/upload/products/item-1.png', url: '/news', title: 'Làm thế nào nhận diện căn hộ homestay phù hợp để kinh doanh' }
];

class Sidebar extends Component {
  listItem(item: any) {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={
            <a href={item.url}>
              <img src={item.image} className="item-thumb" />
            </a>
          }
          title={<a href={item.url}>{item.title}</a>}
        />
      </List.Item>
    );
  }

  render() {
    return (
      <Row>
        <Row className="sidebar">
          <h3 className="title">Tin mới</h3>
          <List itemLayout="horizontal" dataSource={data} renderItem={this.listItem} />
        </Row>
        <Row className="sidebar">
          <h3 className="title">Tin xem nhiều</h3>
          <List itemLayout="horizontal" dataSource={data} renderItem={this.listItem} />
        </Row>
      </Row>
    );
  }
}

export default Sidebar;
