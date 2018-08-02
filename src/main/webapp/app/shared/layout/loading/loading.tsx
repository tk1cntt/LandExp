import React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component {
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'space-around',
      minHeight: 300
    };

    return (
      <div style={style}>
        <Spin tip="Đang cập nhật dữ liệu..." />
      </div>
    );
  }
}

export default Loading;
