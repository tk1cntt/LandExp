/* tslint:disable */
import './home.css';

import React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomeSearchBox extends React.Component<IHomeProp> {
  componentDidMount() {
    $('.select li').click(function() {
      $(this)
        .siblings()
        .removeClass('active');
      $(this).addClass('active');
    });

    $('.select .js-type li').click(function() {
      $('.select span#type').text($(this).html());
      $('.select input#slType').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-category li').click(function() {
      $('.select span#category').text($(this).html());
      $('.select input#slCategory').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-price li').click(function() {
      $('.select span#price').text($(this).text());
      $('.select input#slPrice').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-square li').click(function() {
      $('.select span#square').text($(this).text());
      $('.select input#slSqrare').attr('value', $(this).attr('data-value'));
    });

    $('.js-bathroom li').click(function() {
      $('.js-bathroom').css('display', 'none');
      $('#bathroom span').text($(this).html());
      $('input#slBathroom').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-bathroom li').click(function() {
      $('.select span#bathroom').text($(this).text());
      $('.select input#slBathroom').attr('value', $(this).attr('data-value'));
    });

    $('.js-bedroom li').click(function() {
      $('.js-bedroom').css('display', 'none');
      $('#bedroom span').text($(this).html());
      $('input#slBedroom').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-bedroom li').click(function() {
      $('.select span#bedroom').text($(this).text());
      $('.select input#slBedroom').attr('value', $(this).attr('data-value'));
    });

    $('.js-price .advance-options input').change(function() {
      $('#price').html($('.js-price input.min-value').val() + ' - ' + $('.js-price input.max-value').val() + ' tỷ');
    });

    $('.js-square .advance-options input').change(function() {
      $('#square').html($('.js-square input.min-value').val() + ' - ' + $('.js-square input.max-value').val() + ' m2');
    });
  }

  render() {
    const { account } = this.props;
    return (
      <div className="search">
        <form action="./search-guest.html">
          <h2>Nhu cầu của bạn là gì?</h2>
          <div className="select-box">
            <label className="radio-container">
              Mua
              <input type="radio" name="radio" />
              <span className="checkmark" />
            </label>
            <label className="radio-container">
              Thuê
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
                    <li className="options" data-value>
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
                              <input type="text" id="txtPriceMinValue" name="pricemin" placeholder="Từ" className="min-value options" />
                              <div id="lblPriceMin" />
                            </td>
                            <td className="advance-options">
                              <span className="advance-options" />
                            </td>
                            <td className="advance-options">
                              <input type="text" id="txtPriceMaxValue" name="pricemax" placeholder="Đến" className="max-value options" />
                              <div id="lblPriceMax" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <li className="options" data-value>
                      Bất kỳ
                    </li>
                    <li className="options" data-value>
                      &lt; 500 triệu
                    </li>
                    <li className="options" data-value>
                      500 triệu - 1 tỷ
                    </li>
                    <li className="options" data-value>
                      1 - 1.5 tỷ
                    </li>
                    <li className="options" data-value>
                      1.5 - 2 tỷ
                    </li>
                    <li className="options" data-value>
                      2 - 3 tỷ
                    </li>
                    <li className="options" data-value>
                      3 - 5 tỷ
                    </li>
                    <li className="options" data-value>
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
                              <input type="text" id="txtSquareMinValue" name="pricemin" placeholder="Từ" className="min-value options" />
                              <div id="lblSquareMin" />
                            </td>
                            <td className="advance-options">
                              <span className="advance-options" />
                            </td>
                            <td className="advance-options">
                              <input type="text" id="txtSquareMaxValue" name="pricemax" placeholder="Đến" className="max-value options" />
                              <div id="lblSquareMax" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <li className="options" data-value>
                      Bất kỳ
                    </li>
                    <li className="options" data-value>
                      &lt; 50 m2
                    </li>
                    <li className="options" data-value>
                      50 - 80 m2
                    </li>
                    <li className="options" data-value>
                      80 - 100 m2
                    </li>
                    <li className="options" data-value>
                      100 - 200 m2
                    </li>
                    <li className="options" data-value>
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
                    <li className="options" value={0}>
                      Bất kỳ
                    </li>
                    <li className="options" value={1}>
                      1
                    </li>
                    <li className="options" value={2}>
                      2
                    </li>
                    <li className="options" value={3}>
                      3
                    </li>
                    <li className="options" value={4}>
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
                    <li className="options" data-value={0}>
                      Bất kỳ
                    </li>
                    <li className="options" data-value={1}>
                      +1
                    </li>
                    <li className="options" data-value={2}>
                      +2
                    </li>
                    <li className="options" data-value={3}>
                      +3
                    </li>
                    <li className="options" data-value={4}>
                      +4
                    </li>
                    <li className="options" data-value={5}>
                      +5
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix" />
            </div>
            <button type="submit">TÌM KIẾM</button>
          </div>
        </form>
        <div className="download">
          <p>Tải ứng dụng trên Store</p>
          <div className="app-icon">
            <span>
              <a href="#">
                <i className="fa fa-apple" />
              </a>
            </span>
            <span>
              <a href="#">
                <i className="fa fa-android" />
              </a>
            </span>
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSearchBox);
