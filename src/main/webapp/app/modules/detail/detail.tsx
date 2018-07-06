import './detail.css';

import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Carousel as Album } from 'react-responsive-carousel';

import { Carousel, Tabs, Input, Button, Spin } from 'antd';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getMoney, decodeId } from 'app/shared/util/utils';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { getEntity } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SearchPage from 'app/shared/layout/search/search-menu';
import GoogleMaps from 'app/shared/util/google-maps';

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {}

export interface IDetailState {
  search: string;
}

export class Detail extends React.Component<IDetailProp, IDetailState> {
  componentDidMount() {
    this.props.getCities();
    const houseId = decodeId(this.props.match.params.key);
    this.props.getEntity(houseId);
    /* tslint:disable-next-line */
    this.props.getImageOfHouse(parseInt(houseId));
  }

  houseSliderFrom(slides: any) {
    return (
      <Col md="6">
        <div className="justify-content-center" style={{ border: '1px solid #dfdfdf' }}>
          <Album autoPlay>{slides}</Album>
        </div>
      </Col>
    );
  }

  houseDetailForm() {
    return (
      <Col md="3" className="product-info">
        <h1>{getLandType(this.props.houseEntity.landType)}</h1>
        <p className="post-date">
          <TextFormat type="date" value={this.props.houseEntity.createAt} format={APP_LOCAL_DATE_FORMAT} />
        </p>
        <p
          className="price"
          dangerouslySetInnerHTML={{ __html: getMoney(this.props.houseEntity.money, this.props.houseEntity.actionType) }}
        />
        <div className="property">
          <p className="compact">
            Diện tích:<span>{this.props.houseEntity.acreage}m2</span>
          </p>
          <p className="compass">
            Hướng:<span>Tây bắc</span>
          </p>
          <p className="bedroom">
            Phòng ngủ:<span>{this.props.houseEntity.bedRoom}</span>
          </p>
          <p className="bathroom">
            Phòng tắm:<span>{this.props.houseEntity.bathRoom}</span>
          </p>
          <p className="gara">
            Chỗ để ô tô:<span>{this.props.houseEntity.parking ? 'Có' : 'Không'}</span>
          </p>
        </div>
        <div className="location">
          <span className="title">Địa chỉ</span>
          <p>
            {this.props.houseEntity.address}, {this.props.houseEntity.wardName}, {this.props.houseEntity.districtName},{' '}
            {this.props.houseEntity.cityName}
          </p>
        </div>
        <div className="button-group">
          <a href="#" className="like">
            <FontAwesomeIcon icon="heart" /> Yêu thích
          </a>
          <a href="#" className="report">
            <FontAwesomeIcon icon="exclamation-triangle" /> Báo xấu
          </a>
        </div>
      </Col>
    );
  }

  houseContactForm() {
    return (
      <Col md="3" className="contact-box">
        <div className="contact">
          <h3>Liên hệ chủ nhà</h3>
          <p>
            <i className="fa fa-user" /> {this.props.houseEntity.customer}
          </p>
          <p>
            <i className="fa fa-mobile" /> {this.props.houseEntity.mobile}
          </p>
          <p>
            <i className="fa fa-envelope-o" /> {this.props.houseEntity.email}
          </p>
        </div>
        <div className="call-chat">
          <a href="#" className="call">
            Gọi điện
          </a>
          <a href="#" className="chat">
            Chat
          </a>
        </div>
        <div className="contact">
          <h3>Thời gian xem bất động sản</h3>
          <p>
            <i className="fa fa-square" /> 17h - 19h các ngày trong tuần
          </p>
          <p>
            <i className="fa fa-square" /> 10h - 12h các ngày thứ 7, chủ nhật
          </p>
          <p className="text-center">
            <Button type="primary">Đặt lịch xem</Button>{' '}
          </p>
        </div>
      </Col>
    );
  }

  houseNearByForm() {
    return (
      <Tabs defaultActiveKey="1" style={{ border: '1px solid #dfdfdf', padding: 10, minHeight: 400, maxHeight: 400 }}>
        <TabPane
          tab={
            <span>
              <FontAwesomeIcon icon="utensils" /> Nhà hàng
            </span>
          }
          key="1"
        >
          Content of Tab Pane 1
        </TabPane>
        <TabPane
          tab={
            <span>
              <FontAwesomeIcon icon="shopping-cart" /> Mua sắm
            </span>
          }
          key="2"
        >
          Content of Tab Pane 2
        </TabPane>
        <TabPane
          tab={
            <span>
              <FontAwesomeIcon icon="graduation-cap" /> Trường học
            </span>
          }
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }

  render() {
    const { loading, updating } = this.props;
    const slides = [];
    if (this.props.housePhotoList) {
      this.props.housePhotoList.map(file => {
        slides.push(<img key={file.id} className="center-cropped" src={`data:image/jpeg;base64,${file.image}`} />);
      });
    }
    return (
      <Row>
        <SearchPage />
        <Container>
          <Spin spinning={this.props.loading} tip="Đang cập nhật dữ liệu...">
            <Row>
              <Col md="12">
                <Row>
                  <Breadcrumb className="breadcrumb">
                    <BreadcrumbItem>
                      <a href="http://tinvang.com.vn">Mua bán nhà đất</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{getLandType(this.props.houseEntity.landType)}</BreadcrumbItem>
                  </Breadcrumb>
                </Row>
              </Col>
            </Row>
            <Row>
              <Row id="product-content">
                {this.houseSliderFrom(slides)}
                {this.houseDetailForm()}
                {this.houseContactForm()}
              </Row>
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md="5">{this.houseNearByForm()}</Col>
                <Col md="7">
                  <GoogleMaps />
                </Col>
              </Row>
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md="5">
                  <h6>Mô tả thêm</h6>
                  <div className="product-desc">
                    Nhà 7 tầng THANG MÁY GARA ÔTÔ KINH DOANH đỉnh 60m2 MT4,8m giá 13.5tỷ + Nhà nằm tại vị trí đắc địa của Quận Cầu Giấy,
                    trong khu phân lô, ÔTÔ chạy VÒNG QUANH, đường trước nhà ÔTÔ TRÁNH nhau thoải mái. + Nhà xây mới, thiết kế hiện đại, mỗi
                    tầng 2 phòng, giếng trời thông thoáng, THANG MÁY nhập khẩu. + Nhà dễ chuyển đổi công năng, ở hay KINH DOANH đều tuyệt. +
                    Sổ đẹp như HOA HẬU, NỞ, chính chủ pháp lý rõ ràng. Liên hệ Mr Sơn: 0989 65 65 02 – 0919 65 65 02. Chuyên Bất Động Sản
                    Thổ Cư - Tư vấn tận tâm, chuyên nghiệp, trung thực. Hỗ trợ thủ tục pháp lý, miễn phí 100% mọi dịch vụ cho khách.
                  </div>
                </Col>
                <Col md="7">
                  <h6>Tư vấn tài chính</h6>
                  <Row className="cs-content">
                    <Col md="5">
                      <div className="form-group">
                        <label>Giá trị nhà bạn muốn mua</label>
                        <Input placeholder="0.0" />
                        <span className="input-addon">VNĐ</span>
                      </div>
                    </Col>
                    <Col md="5" style={{ marginLeft: -15 }}>
                      <div className="form-group">
                        <label>Số tiền tích lũy hàng tháng</label>
                        <Input placeholder="0.0" />
                        <span className="input-addon">VNĐ</span>
                      </div>
                    </Col>
                    <Col md="2" style={{ marginLeft: -15 }}>
                      <div className="form-group">
                        <label>Lãi vay</label>
                        <Input placeholder="0.0" />
                        <span className="input-addon">%</span>
                      </div>
                    </Col>
                    <Col md="5">
                      <div className="form-group">
                        <label>Số tiền bạn có</label>
                        <Input placeholder="0.0" />
                        <span className="input-addon">VNĐ</span>
                      </div>
                      <div className="form-group">
                        <label>Số tiền bạn có thể vay</label>
                        <Input placeholder="0.0" />
                        <span className="input-addon">VNĐ</span>
                      </div>
                    </Col>
                    <Col md="7" style={{ marginLeft: -15 }}>
                      <label>Tư vấn</label>
                      <TextArea
                        rows={5}
                        placeholder="Bạn cần vay số tiền { } VNĐ trong vòng { } năm với số tiền tích lũy hàng tháng không nhỏ hơn { } VNĐ để có thể mua được ngôi nhà này"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </Spin>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  houseEntity: storeState.house.entity,
  loading: storeState.house.loading,
  updating: storeState.house.updating,
  cities: storeState.city.entities,
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { getEntity, getImageOfHouse, getCities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
