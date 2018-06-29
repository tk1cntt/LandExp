import './header.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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

  render() {
    const menu = (
      <Menu>
        <SubMenu key="sub1" title={<span><Icon type="appstore" /><span> Quản lý tin đăng </span></span>}>
          <Menu.Item>
            <Link to="/tai-khoan/danh-sach-tin-dang">
              <FontAwesomeIcon icon="newspaper" /> Tin đã đăng của bạn
              </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="setting" /><span> Quản lý tài khoản </span></span>}>
          <Menu.Item>
            <Link to="/tai-khoan/thong-tin-tai-khoan">
              <FontAwesomeIcon icon="user-circle" /> Thông tin tài khoản
          </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tai-khoan/thay-doi-mat-khau">
              <FontAwesomeIcon icon="key" /> Thay đổi mật khẩu
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
    const { currentLocale, isAuthenticated, isAdmin, isManager, isStaff, isSwaggerEnabled, isInProduction } = this.props;
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="logo">
              {isAuthenticated ? (
                <Link to={'/'}>
                  <img src="/static/images/logo.png" alt="LandExp" />
                </Link>
              ) : (
                <a href={'http://tinvang.com.vn'}>
                  <img src="/static/images/logo.png" alt="LandExp" />
                </a>
              )}
            </div>
            <ul className="menu left-menu">
              <li>
                <Link to={'/mua'}>Mua</Link>
              </li>
              <li>
                <Link to={'/thue'}>Thuê</Link>
              </li>
              <li>
                <Link to={'/tro-giup'}>Trợ giúp</Link>
              </li>
              <li>
                <Link to={'/tin-tuc'}>Tin tức</Link>
              </li>
            </ul>
            {!isAuthenticated ? (
              <ul className="menu right-menu">
                <li className="right-info">
                  <span className="ring-icon">
                    <span className="badge">2</span>
                  </span>
                  <span className="chat-icon">
                    <span className="badge">5</span>
                  </span>
                </li>
                <li>
                  <Dropdown overlay={menu}>
                    <Link to={'/'}>
                      <img className="avatar" src="/static/images/user.jpg" alt="Thong tin tai khoan" />
                    </Link>
                  </Dropdown>,
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
