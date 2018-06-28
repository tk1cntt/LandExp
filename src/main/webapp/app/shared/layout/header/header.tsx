import './header.css';

import * as React from 'react';
import { Link } from 'react-router-dom';

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
    const { currentLocale, isAuthenticated, isAdmin, isManager, isStaff, isSwaggerEnabled, isInProduction } = this.props;
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="logo">
              <Link to={'/'}>
                <img src="/static/images/logo.png" alt="LandExp" />
              </Link>
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
            {isAuthenticated ? (
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
                  <a href="#">
                    <img className="avatar" src="/static/images/user.jpg" alt="Thong tin tai khoan" />
                  </a>
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
