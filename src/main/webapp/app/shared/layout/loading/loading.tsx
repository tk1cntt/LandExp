import React from 'react';
import { Toast } from 'antd-mobile';

class Loading extends React.Component {
  componentDidMount() {
    Toast.loading('Loading...', 30);
    setTimeout(() => {
      Toast.hide();
    }, 1000);
  }

  render() {
    return (
      <>
      </>
    );
  }
}

export default Loading;
