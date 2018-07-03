/* tslint:disable */
import './search-menu.css';

import * as React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Select, Input } from 'antd';
const Option = Select.Option;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType } from 'app/shared/util/utils';

export interface ISearchPageProp extends StateProps, DispatchProps {}

export class SearchPage extends React.Component<ISearchPageProp> {
  handleChangeActionType = () => {};

  componentDidMount() {
    $('.dropdown-submenu div').on('click', function(e) {
      $(this)
        .next('ul')
        .toggle();
      e.stopPropagation();
      e.preventDefault();
    });

    $('.dropdown-menu.has-sub').on('click', function(event) {
      event.stopPropagation();
    });

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

    $('.js-gara li').click(function() {
      $('.js-gara').css('display', 'none');
      $('#gara span').text($(this).html());
      $('input#slGara').attr('value', $(this).attr('data-value'));
    });

    $('.js-direction li').click(function() {
      $('.js-direction').css('display', 'none');
      $('#direction span').text($(this).html());
      $('input#slDirection').attr('value', $(this).attr('data-value'));
    });

    $('.js-postdate li').click(function() {
      $('.js-postdate').css('display', 'none');
      $('#postdate span').text($(this).html());
      $('input#slPostdate').attr('value', $(this).attr('data-value'));
    });

    $('#close-menu').click(function() {
      $('.select.dropdown.mega-dropdown').removeClass('open');
      $('#filter-more').attr('aria-expanded', 'false');
      $('.dropdown-backdrop').remove();
      let filterCount = 0;

      if ($('.dropdown-submenu input#slBathroom').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slBedroom').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slGara').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slDirection').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slPostdate').val() !== '') {
        filterCount++;
      }
      $('#filter-more').html('Lọc thêm <strong>(' + filterCount + ')</strong>');
    });

    $('#clear-menu').click(function() {
      $('#bathroom span').html('Bất kỳ');
      $('input#slBathroom').attr('value', '');
      $('#bedroom span').html('Bất kỳ');
      $('input#slBedroom').attr('value', '');
      $('#gara span').html('Bất kỳ');
      $('input#slGara').attr('value', '');
      $('#direction span').html('Bất kỳ');
      $('input#slDirection').attr('value', '');
      $('#postdate span').html('Bất kỳ');
      $('input#slPostdate').attr('value', '');
    });

    $('.js-price .advance-options input').change(function() {
      $('#price').html($('.js-price input.min-value').val() + ' - ' + $('.js-price input.max-value').val() + ' tỷ');
    });

    $('.js-square .advance-options input').change(function() {
      $('#square').html($('.js-square input.min-value').val() + ' - ' + $('.js-square input.max-value').val() + ' m2');
    });
  }

  actionTypeForm() {
    return (
      <Select style={{ width: 130, marginRight: 1 }} placeholder="Hình thức" onChange={this.handleChangeActionType}>
        <Option value="FOR_SELL">Bán</Option>
        <Option value="FOR_RENT">Cho thuê</Option>
      </Select>
    );
  }

  landTypeForm() {
    return (
      <Select style={{ width: 180, marginRight: 1 }} placeholder="Loại bất động sản" onChange={this.handleChangeActionType}>
        <Option value="APARTMENT">{getLandType('APARTMENT')}</Option>
        <Option value="HOME">{getLandType('HOME')}</Option>
        <Option value="HOME_VILLA">{getLandType('HOME_VILLA')}</Option>
        <Option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</Option>
        <Option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</Option>
        <Option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</Option>
        <Option value="LAND_FARM">{getLandType('LAND_FARM')}</Option>
        <Option value="LAND_RESORT">{getLandType('LAND_RESORT')}</Option>
        <Option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</Option>
        <Option value="OFFICE">{getLandType('OFFICE')}</Option>
        <Option value="WAREHOUSES">{getLandType('WAREHOUSES')}</Option>
        <Option value="KIOSKS">{getLandType('KIOSKS')}</Option>
      </Select>
    );
  }

  keywordForm() {
    return <Input style={{ width: 335, marginRight: 1 }} placeholder="Nhập địa điểm, thành phố hoặc dự án" />;
  }

  priceForm() {
    return (
      <Select key="money-range" style={{ width: 145, marginRight: 1 }} placeholder="Khoảng giá" onChange={this.handleChangeActionType}>
        <Option value="500">&lt; 500 triệu</Option>
        <Option value="1000">500 triệu - 1 tỷ</Option>
        <Option value="1500">1 - 1.5 tỷ</Option>
        <Option value="2000">1.5 - 2 tỷ</Option>
        <Option value="3000">2 - 3 tỷ</Option>
        <Option value="5000">3 - 5 tỷ</Option>
        <Option value="">&gt; 5 tỷ</Option>
      </Select>
    );
  }

  acreageForm() {
    return (
      <Select key="acreage-range" style={{ width: 145, marginRight: 1 }} placeholder="Diện tích" onChange={this.handleChangeActionType}>
        <Option value="50">&lt; 50 m2</Option>
        <Option value="80">50 - 80 m2</Option>
        <Option value="100">80 - 100 m2</Option>
        <Option value="200">100 - 200 m2</Option>
        <Option value="">&gt; 200 m2</Option>
      </Select>
    );
  }

  menuTypeClick(e) {}

  menuTypeForm() {
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="type" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Hình thức
          </span>
          <input type="hidden" id="slType" name="slType" />
          <ul className="dropdown-menu js-type" aria-labelledby="type" onClick={this.menuTypeClick}>
            <li className="options active" data-value="mua">
              Mua
            </li>
            <li className="options" data-value="thue">
              Thuê
            </li>
          </ul>
        </div>
      </div>
    );
  }

  menuLandTypeClick(e) {}

  menuLandTypeForm() {
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="category" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Loại bất động sản
          </span>
          <input type="hidden" id="slCategory" name="slCategory" />
          <ul className="dropdown-menu js-category" aria-labelledby="category" onClick={this.menuLandTypeClick}>
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
    );
  }

  menuPriceClick(e) {}

  menuPriceForm() {
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="price" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Khoảng giá
          </span>
          <input type="hidden" id="slPrice" name="slPrice" />
          <ul className="dropdown-menu js-price" aria-labelledby="price" onClick={this.menuPriceClick}>
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
    );
  }

  menuSpareClick(e) {}

  menuSpareForm() {
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="square" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Diện tích
          </span>
          <input type="hidden" id="slSqrare" name="slSqrare" />
          <ul className="dropdown-menu js-square" aria-labelledby="square" onClick={this.menuSpareClick}>
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
    );
  }

  /*
  menuMoreClick() {
  }
  */

  menuMoreForm() {
    return (
      <div className="select-box">
        <div className="select dropdown mega-dropdown">
          <span id="filter-more" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Lọc thêm
          </span>
          <ul className="dropdown-menu has-sub" aria-labelledby="filter-more">
            <li className="options dropdown-submenu">
              <input type="hidden" id="slBathroom" name="slBathroom" />
              <div id="bathroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Số phòng tắm<span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-bathroom" aria-labelledby="bathroom">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>+1</li>
                <li data-value={2}>+2</li>
                <li data-value={3}>+3</li>
                <li data-value={4}>+4</li>
                <li data-value={5}>+5</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slBedroom" name="slBedroom" />
              <div id="bedroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Số phòng ngủ<span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-bedroom" aria-labelledby="bedroom">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>+1</li>
                <li data-value={2}>+2</li>
                <li data-value={3}>+3</li>
                <li data-value={4}>+4</li>
                <li data-value={5}>+5</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slGara" name="slGara" />
              <div id="gara" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Chỗ để ô tô<span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-gara" aria-labelledby="gara">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>Có</li>
                <li data-value={0}>Không</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slDirection" name="slDirection" />
              <div id="direction" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Hướng<span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-direction" aria-labelledby="direction">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>Đông</li>
                <li data-value={2}>Tây</li>
                <li data-value={3}>Nam</li>
                <li data-value={4}>Bắc</li>
                <li data-value={5}>Đông Bắc</li>
                <li data-value={6}>Đông Nam</li>
                <li data-value={7}>Tây Bắc</li>
                <li data-value={8}>Tây Nam</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slPostdate" name="slPostdate" />
              <div id="postdate" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Ngày đăng<span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-postdate" aria-labelledby="postdate">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>Cách đây 1 ngày</li>
                <li data-value={3}>Cách đây 3 ngày</li>
                <li data-value={7}>Cách đây 7 ngày</li>
                <li data-value={15}>Cách đây 15 ngày</li>
                <li data-value={30}>Cách đây 30 ngày</li>
              </ul>
            </li>
            <li className="dropdown-button">
              <div className="btn-row">
                <div>
                  <button type="button" id="clear-menu" className="btn btn-sub btn-default">
                    Xóa
                  </button>
                </div>
                <div>
                  <button type="button" id="close-menu" className="btn btn-sub btn-primary">
                    Hoàn tất
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { account } = this.props;
    return (
      <Col md="12">
        <div style={{ marginBottom: 30 }} className="nav-search">
          <div className="container">
            <form>
              <div className="row">
                {this.menuTypeForm()}
                {this.menuLandTypeForm()}
                <div className="select-box">
                  <input type="text" name="txLocation" placeholder="Nhập địa điểm, thành phố hoặc dự án" />
                </div>
                {this.menuPriceForm()}
                {this.menuSpareForm()}
                {this.menuMoreForm()}
                <div className="select-box">
                  <button type="submit">Tìm kiếm</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
