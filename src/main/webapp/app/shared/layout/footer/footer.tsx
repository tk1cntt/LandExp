import './footer.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>LandExp.com.vn</h2>
                <p>Hotline office: 0909333333</p>
                <p>Email: office@landexp.com.vn</p>
                <p>Phone: 0220 383 9999</p>
                <p>
                  Địa chỉ: Số 02, ngách 158/51 Nguyễn Khánh Toàn,<br /> P.Quan Hoa, Q.Cầu Giấy, TP.Hà Nội
                </p>
                <img src="static/images/dathongbao.png" alt="LandExp" />
              </div>
              <div className="col-md-2">
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
              </div>
              <div className="col-md-2">
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
              </div>
              <div className="col-md-4">
                <h2>Tải ứng dụng</h2>
                <p>Tải ứng dụng Bất động sản của LandExp để mua bán cho thuê nhanh chóng nhất.</p>
                <p className="link-app">
                  <a href="#">
                    <img src="static/images/icon/IOS.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="static/images/icon/ANDROID.png" alt="" />
                  </a>
                </p>
                <div className="social-icon">
                  <FontAwesomeIcon icon="facebook" />
                  <FontAwesomeIcon icon="google-plus" />
                  <FontAwesomeIcon icon="twitter" />
                  <FontAwesomeIcon icon="youtube" />
                </div>
              </div>
              <div className="clearfix" />
            </div>
            <div className="copyright">
              <p>Copyright © 2018 LandExp. All rights reserved.</p>
            </div>
          </div>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
