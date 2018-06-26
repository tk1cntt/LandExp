import './search.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import Demand from '../demand/demand';
import Download from '../download/download';

export interface ISearchBoxProp extends StateProps, DispatchProps {}

export class SearchBox extends React.Component<ISearchBoxProp> {
  render() {
    return (
      <Row className="justify-content-center">
        <div className="search">
          <h1>Nhu cầu của bạn là gì?</h1>
          <div className="select-box">
            <label className="radio-container">
              <Translate contentKey="demand.buy">Buy</Translate>
              <input type="radio" name="radio" />
              <span className="checkmark" />
            </label>
            <label className="radio-container">
              <Translate contentKey="demand.rent">Rent</Translate>
              <input type="radio" name="radio" />
              <span className="checkmark" />
            </label>
          </div>
          <div className="search-box">
            <div className="top-search-box">
              <div className="select">
                <div className="dropdown">
                  <span id="category" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Loại bất động sản
                  </span>
                  <input type="hidden" id="slCategory" name="slCategory" />
                  <ul className="dropdown-menu js-category" aria-labelledby="category">
                    <li className="options" data-value="">
                      Bất kỳ
                    </li>
                    <li className="options" data-value="can-ho-chung-cu">
                      Căn hộ chung cư
                    </li>
                    <li className="options" data-value="penthouse">
                      Penthouse
                    </li>
                    <li className="options" data-value="nha-rieng">
                      Nhà riêng
                    </li>
                    <li className="options" data-value="biet-thu-lien-ke">
                      Biệt thự, liền kề
                    </li>
                    <li className="options" data-value="nha-mat-pho">
                      Nhà mặt phố
                    </li>
                    <li className="options" data-value="dat-o">
                      Đất ở
                    </li>
                    <li className="options" data-value="dat-nen-du-an">
                      Đất nền dự án
                    </li>
                    <li className="options" data-value="kho-nha-xuong">
                      Kho, nhà xưởng
                    </li>
                    <li className="options" data-value="cua-hang-ki-ot">
                      Cửa hàng, ki-ốt
                    </li>
                  </ul>
                </div>
              </div>
              <div className="keyword">
                <input type="text" placeholder="Nhập địa điểm, thành phố hoặc dự án" />
              </div>
              <div className="clearfix" />
            </div>
            <div className="bottom-search-box">
              <div className="select">
                <label>Khoảng giá</label>
                <div className="dropdown">
                  <span id="price" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Bất kỳ
                  </span>
                  <input type="hidden" id="slPrice" name="slPrice" />
                  <ul className="dropdown-menu js-price" aria-labelledby="price">
                    <div className="header-box">
                      <table className="header-options options">
                        <tbody>
                          <tr className="advance-options">
                            <td className="advance-options">
                              <input
                                type="text"
                                id="txtPriceMinValue"
                                name="pricemin"
                                placeholder="Từ"
                                className="min-value options"
                                value=""
                              />
                              <div id="lblPriceMin" />
                            </td>
                            <td className="advance-options">
                              <span className="advance-options" />
                            </td>
                            <td className="advance-options">
                              <input
                                type="text"
                                id="txtPriceMaxValue"
                                name="pricemax"
                                placeholder="Đến"
                                className="max-value options"
                                value=""
                              />
                              <div id="lblPriceMax" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <li className="options" data-value="">
                      Bất kỳ
                    </li>
                    <li className="options" data-value="">
                      &lt; 500 triệu
                    </li>
                    <li className="options" data-value="">
                      500 triệu - 1 tỷ
                    </li>
                    <li className="options" data-value="">
                      1 - 1.5 tỷ
                    </li>
                    <li className="options" data-value="">
                      1.5 - 2 tỷ
                    </li>
                    <li className="options" data-value="">
                      2 - 3 tỷ
                    </li>
                    <li className="options" data-value="">
                      3 - 5 tỷ
                    </li>
                    <li className="options" data-value="">
                      &gt; 5 tỷ
                    </li>
                  </ul>
                </div>
              </div>
              <div className="select">
                <label>Diện tích</label>
                <div className="dropdown">
                  <span id="square" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Bất kỳ
                  </span>
                  <input type="hidden" id="slSqrare" name="slSqrare" />
                  <ul className="dropdown-menu js-square" aria-labelledby="square">
                    <div className="header-box">
                      <table className="header-options options">
                        <tbody>
                          <tr className="advance-options">
                            <td className="advance-options">
                              <input
                                type="text"
                                id="txtSquareMinValue"
                                name="pricemin"
                                placeholder="Từ"
                                className="min-value options"
                                value=""
                              />
                              <div id="lblSquareMin" />
                            </td>
                            <td className="advance-options">
                              <span className="advance-options" />
                            </td>
                            <td className="advance-options">
                              <input
                                type="text"
                                id="txtSquareMaxValue"
                                name="pricemax"
                                placeholder="Đến"
                                className="max-value options"
                                value=""
                              />
                              <div id="lblSquareMax" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <li className="options" data-value="">
                      Bất kỳ
                    </li>
                    <li className="options" data-value="">
                      &lt; 50 m2
                    </li>
                    <li className="options" data-value="">
                      50 - 80 m2
                    </li>
                    <li className="options" data-value="">
                      80 - 100 m2
                    </li>
                    <li className="options" data-value="">
                      100 - 200 m2
                    </li>
                    <li className="options" data-value="">
                      &gt; 200 m2
                    </li>
                  </ul>
                </div>
              </div>
              <div className="select">
                <label>Số phòng ngủ</label>
                <div className="dropdown">
                  <span id="bedroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Bất kỳ
                  </span>
                  <input type="hidden" id="slBedroom" name="slBedroom" />
                  <ul className="dropdown-menu js-bedroom" aria-labelledby="bedroom">
                    <li className="options" value="">
                      Bất kỳ
                    </li>
                    <li className="options" value="1">
                      1
                    </li>
                    <li className="options" value="2">
                      2
                    </li>
                    <li className="options" value="3">
                      3
                    </li>
                    <li className="options" value="4">
                      4
                    </li>
                  </ul>
                </div>
              </div>
              <div className="select">
                <label>Số phòng tắm</label>
                <div className="dropdown">
                  <span id="bathroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Bất kỳ
                  </span>
                  <input type="hidden" id="slBathroom" name="slBathroom" />
                  <ul className="dropdown-menu js-bathroom" aria-labelledby="bathroom">
                    <li className="options" data-value="">
                      Bất kỳ
                    </li>
                    <li className="options" data-value="1">
                      +1
                    </li>
                    <li className="options" data-value="2">
                      +2
                    </li>
                    <li className="options" data-value="3">
                      +3
                    </li>
                    <li className="options" data-value="4">
                      +4
                    </li>
                    <li className="options" data-value="5">
                      +5
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix" />
            </div>
            <button type="submit">TÌM KIẾM</button>
          </div>
          <div className="download">
            <p>Tải ứng dụng trên Store</p>
            <div className="app-icon">
              <span>
                <a href="">
                  <i className="fa fa-apple" />
                </a>
              </span>
              <span>
                <a href="">
                  <i className="fa fa-android" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
