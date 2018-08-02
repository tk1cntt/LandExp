import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer, SearchBar, List, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { Icon } from 'antd';

class SideBar extends React.Component {
  render() {
    return (
      <List renderHeader={'Thông tin'}>
        <List.Item arrow="horizontal" thumb={<Icon type="user-add" />} ><Link to={'/'}>Trang chủ</Link></List.Item>
        <List.Item arrow="horizontal" thumb={<Icon type="user-add" />} >Đăng ký</List.Item>
        <List.Item arrow="horizontal" thumb={<Icon type="unlock" />} >Đăng nhập</List.Item>
        <List.Item arrow="horizontal" thumb={<Icon type="edit" />} >Đăng tin</List.Item>
      </List>
    );
  }
}

const mapStateToProps = storeState => ({
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
