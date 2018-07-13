import React from 'react';
import { Spin } from 'antd';

const Loading = props => (
  <div className="justify-content-center">
    <Spin tip="Đang cập nhật dữ liệu..." />
  </div>
);

export default Loading;
