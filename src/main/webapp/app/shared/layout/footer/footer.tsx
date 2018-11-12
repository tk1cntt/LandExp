import './footer.css';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row, Icon } from 'antd';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Footer = props => (
  <Row>
    <footer>
      <div className="container">
        <Row gutter={20}>
          <Col md={7}>
            <h2>LandExp.com.vn</h2>
            <p>Hotline office: 0909333333</p>
            <p>Email: office@landexp.com.vn</p>
            <p>Phone: 0220 383 9999</p>
            <p>
              Địa chỉ: Số 02, ngách 158/51 Nguyễn Khánh Toàn,<br /> P.Quan Hoa, Q.Cầu Giấy, TP.Hà Nội
            </p>
            <img src="/static/images/dadangky.png" alt="Bat dong san LandExp" />
          </Col>
          <Col md={5}>
            <h2>Về chúng tôi</h2>
            <ul>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Giải pháp</a>
              </li>
              <li>
                <a href="#">Đội ngũ nhân sự</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
            </ul>
          </Col>
          <Col md={5}>
            <h2>Hỗ trợ</h2>
            <ul>
              <li>
                <a href="#">Dành cho người bán</a>
              </li>
              <li>
                <a href="#">Dành cho người mua</a>
              </li>
              <li>
                <a href="#">Chính sách hợp tác</a>
              </li>
            </ul>
          </Col>
          <Col md={7}>
            <h2>Tải ứng dụng</h2>
            <p>Tải ứng dụng Bất động sản của LandExp để mua bán cho thuê nhanh chóng nhất.</p>
            <p className="link-app">
              <a href="#">
                <img src="/static/images/icon/IOS.png" alt="Ung dung bat dong san cho android" />
              </a>
              <a href="#">
                <img src="/static/images/icon/ANDROID.png" alt="Ung dung bat dong san cho ios" />
              </a>
            </p>
            <div className="social-icon">
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
              <a href="#">
                <i className="fa fa-linkedin" />
              </a>
              <a href="#">
                <i className="fa fa-youtube" />
              </a>
              <a href="#">
                <i className="fa fa-google-plus" />
              </a>
            </div>
          </Col>
        </Row>
        <div className="copyright">
          <p>Copyright © 2018 TinVang. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <div className="mobile-nav">
      <ul>
        <li>
          <a href="/#">
            <Icon type="home" />
            <p>Trang chủ</p>
          </a>
        </li>
        <li>
          <a href="/#">
            <Icon type="heart" />
            <p>Yêu thích</p>
          </a>
        </li>
        <li>
          <a href="/#">
            <Icon type="user" />
            <p>Tài khoản</p>
          </a>
        </li>
        <li>
          <a href="/#">
            <i className="icon menu" />
          </a>
        </li>
      </ul>
    </div>
  </Row>
);

export default Footer;
