import './home.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomePanelUser extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <div className="row featured-posts">
        <h2>
          Tin mới<span>Thứ 5, ngày 31 tháng 05 năm 2018</span>
        </h2>
        <ul>
          <li>
            <img src="/static/images/white-living-room.png" />
            <div className="caption">
              <div className="caption-content">
                <p>
                  <a href="#" className="post-title">
                    Bí quyết để có một ngôi nhà đẹp
                  </a>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim …
                </p>
                <p className="border-left-red cat-title">
                  <a href="">GÓC THIẾT KẾ</a>
                </p>
              </div>
            </div>
          </li>
          <li>
            <img src="/static/images/nha-mau-can-ho-him-lam-phu-an7-1.png" />
            <div className="caption">
              <div className="caption-content">
                <p>
                  <a href="#" className="post-title">
                    Phương pháp đầu tư hiệu quả
                  </a>
                </p>
                <p className="cat-title border-left-cyan">
                  <a href="">KINH TẾ ĐẦU TƯ</a>
                </p>
              </div>
            </div>
          </li>
          <li>
            <img src="/static/images/simple-wall-paint-ideas.png" />
            <div className="caption">
              <div className="caption-content">
                <p>
                  <a href="#" className="post-title">
                    Tính tương đối trong giá cả
                  </a>
                </p>
                <p className="cat-title border-left-cyan">
                  <a href="">KINH TẾ ĐẦU TƯ</a>
                </p>
              </div>
            </div>
          </li>
          <li>
            <img src="/static/images/Homey-Apartment-by-Fertility-Design-3.png" />
            <div className="caption">
              <div className="caption-content">
                <p>
                  <a href="#" className="post-title">
                    Hợp tác để thành công
                  </a>
                </p>
                <p className="cat-title border-left-green">
                  <a href="">KINH NGHIỆM &amp; CUỘC SỐNG</a>
                </p>
              </div>
            </div>
          </li>
          <li>
            <img src="/static/images/ideas-for-pendant-lights-in-the-dining-room-20-eye-catcher-in-the-living-area-0-1870580370.png" />
            <div className="caption">
              <div className="caption-content">
                <p>
                  <a href="#" className="post-title">
                    Đâu là hướng đi cho nhà đầu tư thông minh
                  </a>
                </p>
                <p className="cat-title border-left-green">
                  <a href="">KINH NGHIỆM &amp; CUỘC SỐNG</a>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelUser);
