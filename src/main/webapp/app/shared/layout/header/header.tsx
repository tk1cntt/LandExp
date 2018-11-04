import './header.css';

import React from 'react';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  menuUser() {
    return (
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="appstore" />
            <span> Tin đăng của bạn </span>
          </span>
        }
      >
        <Menu.Item>
          <Link to="/tai-khoan/danh-sach-tin-dang">
            <Icon type="book" /> Xem danh sách tin đăng
          </Link>
        </Menu.Item>
      </SubMenu>
    );
  }

  menuStaff() {
    return (
      <SubMenu
        key="subStaff"
        title={
          <span>
            <Icon type="star" />
            <span> Dành cho nhân viên </span>
          </span>
        }
      >
        <Menu.Item>
          <Link to="/quan-ly/tin-dang">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý tin đăng
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/thanh-toan">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý thanh toán
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/cac-du-an">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý dự án
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/tin-tuc">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý tin tức
          </Link>
        </Menu.Item>
        {/*
        <Menu.Item>
          <Link to="/quan-ly/house-photo">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Ảnh tin đăng
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/khach-hang-tiem-nang">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Khách hàng tiềm năng
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/tu-van-tai-chinh">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Tư vấn tài chính
          </Link>
        </Menu.Item>
        */}
      </SubMenu>
    );
  }

  menuManager() {
    return (
      <SubMenu
        key="subManager"
        title={
          <span>
            <Icon type="safety" />
            <span> Dành cho quản lý </span>
          </span>
        }
      >
        <Menu.Item>
          <Link to="/quan-ly/tinh-thanh">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý tỉnh thành
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/quan-huyen">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý quận huyện
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/xa-phuong">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý xã phường
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/khu-vuc">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý khu vực
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/bang-phi-dich-vu">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Bảng phí dịch vụ
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/danh-muc-tin-tuc">
            <FontAwesomeIcon icon="asterisk" />&nbsp; Danh mục tin tức
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/quan-ly/tai-khoan-nguoi-dung">
            <FontAwesomeIcon icon="user" /> Tài khoản người dùng
          </Link>
        </Menu.Item>
      </SubMenu>
    );
  }

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isManager, isStaff, isSwaggerEnabled, isInProduction } = this.props;
    const menu = (
      <Menu>
        {this.menuUser()}
        {!isStaff ? null : this.menuStaff()}
        {!isManager ? null : this.menuManager()}
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="setting" />
              <span> Quản lý tài khoản </span>
            </span>
          }
        >
          <Menu.Item>
            <Link to="/tai-khoan/thong-tin-tai-khoan">
              <i className="fa fa-user-circle" /> Thông tin tài khoản
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tai-khoan/thay-doi-mat-khau">
              <FontAwesomeIcon icon="bell" /> Thay đổi mật khẩu
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/thoat">
              <FontAwesomeIcon icon="sign-out-alt" /> Thoát
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    return (
      <header>
        <LoadingBar />
        <div className="container">
          <div className="row">
            <div className="logo">
              <Link to={'/'}>
                <img src="/static/images/logo.png" alt="LandExp" />
              </Link>
            </div>
            <ul className="menu left-menu">
              <li>
                <Link to={'/tim-kiem?actionType=FOR_SELL'}>Mua</Link>
              </li>
              <li>
                <Link to={'/tim-kiem?actionType=FOR_RENT'}>Thuê</Link>
              </li>
              <li>
                <Link to={'/tro-giup'}>Trợ giúp</Link>
              </li>
              <li>
                <Link to={'/tin-tuc'}>Tin tức</Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <ul className="menu right-menu">
                {/*}
                <li className="right-info">
                  <span className="ring-icon">
                    <span className="badge">2</span>
                  </span>
                  <span className="chat-icon">
                    <span className="badge">5</span>
                  </span>
                </li>
                {*/}
                <li>
                  <Dropdown overlay={menu}>
                    <img className="avatar" src="/static/images/user.jpg" alt="Thong tin tai khoan" />
                  </Dropdown>
                </li>
                <li>
                  <Link className="button" to={'/tai-khoan/dang-tin'}>
                    Đăng tin
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="menu right-menu">
                <li>
                  <Link className="item" to={'/dang-ky'}>
                    Đăng ký
                  </Link>
                </li>
                <li>
                  <Link className="item" to={'/dang-nhap'}>
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <div>
                    <Link className="button" to={'/tai-khoan/dang-tin'}>
                      Đăng tin
                    </Link>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    );
  }
}
