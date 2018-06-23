import './detail.css';

import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Carousel, Tabs, Input } from 'antd';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType } from 'app/shared/util/utils';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { getEntity } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SearchPage from 'app/modules/search/search-page';
import GoogleMaps from 'app/shared/util/google-maps';

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {}

export interface IDetailState {
  search: string;
}

export class Detail extends React.Component<IDetailProp, IDetailState> {
  componentDidMount() {
    this.props.getCities();
    this.props.getEntity(this.props.match.params.key);
    this.props.getImageOfHouse(parseInt(this.props.match.params.key));
  }

  houseSliderFrom(slides: any) {
    return (
      <Col md="6">
        <div className="justify-content-center" style={{ border: '1px solid #dfdfdf' }}>
          <Carousel autoplay>{slides}</Carousel>
        </div>
      </Col>
    );
  }

  houseDetailForm() {
    const moneyForm =
      this.props.houseEntity.money && this.props.houseEntity.discount ? (
        <div style={{ textDecoration: 'line-through', color: 'red' }}>{new Intl.NumberFormat().format(this.props.houseEntity.money)} VNĐ</div>
      ) : (
        <div>{new Intl.NumberFormat().format(this.props.houseEntity.money)} VNĐ</div>
      );
    const discountForm = this.props.houseEntity.discount ? (
      <div>{new Intl.NumberFormat().format(this.props.houseEntity.discount)} VNĐ</div>
    ) : null;
    return (
      <Col md="3" className="product-info">
        <div className="type">{getLandType(this.props.houseEntity.landType)}</div>
        <p className="post-date"><TextFormat type="date" value={this.props.houseEntity.createAt} format={APP_LOCAL_DATE_FORMAT} /></p>
        <p className="price">
          {moneyForm}
          {discountForm}
          <span>5</span> triệu/tháng
        </p>
        <div className="property">
          <p className="compact">
            Diện tích: <span>{this.props.houseEntity.acreage}</span>
          </p>
          <p className="compass">
            Hướng: <span>{getDirection(this.props.houseEntity.direction)}</span>
          </p>
          <p className="bedroom">
            Phòng ngủ: <span>{this.props.houseEntity.bedRoom}</span>
          </p>
          <p className="bathroom">
            Phòng tắm: <span>{this.props.houseEntity.bathRoom}</span>
          </p>
          <p className="gara">
            Chỗ để ô tô: <span>{this.props.houseEntity.parking ? 'Có' : 'Không'}</span>
          </p>
        </div>
        <div className="location">
          <span className="title">Địa chỉ</span>
          <p>
            {getCityType({
              cities: this.props.cities,
              cityId: this.props.houseEntity.cityId,
              districtId: this.props.houseEntity.districtId,
              wardId: this.props.houseEntity.wardId
            })}
          </p>
        </div>
        <div className="button-group">
          <a href="#" className="like">
            <img src="static/images/icon/like.png" alt="" />Yêu thích
          </a>
          <a href="#" className="report">
            <img src="static/images/icon/warning.png" alt="" />Báo xấu
          </a>
        </div>
      </Col>
    );
  }

  houseContactForm() {
    return (
      <Col md="3" className="contact-box">
        <div className="contact">
          <div>Liên hệ chủ nhà</div>
          <p>
            <FontAwesomeIcon icon="user" /> {this.props.houseEntity.customer}
          </p>
          <p>
            <FontAwesomeIcon icon="mobile" /> {this.props.houseEntity.mobile}
          </p>
          <p>
            <FontAwesomeIcon icon="envelope" /> {this.props.houseEntity.email}
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
          <div>Thời gian xem bất động sản</div>
          <p>
            <FontAwesomeIcon icon="square" /> 17h - 19h các ngày trong tuần
          </p>
          <p>
            <FontAwesomeIcon icon="square" /> 10h - 12h các ngày thứ 7, chủ nhật
          </p>
          <p className="text-center">
            <a href="#" type="button" className="btn btn-default">
              Đặt lịch xem
            </a>
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
          <Row>
            <Col md="12">
              <Breadcrumb className="breadcrumb">
                <BreadcrumbItem>
                  <a href="#">Home</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>Library</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <Row id="product-content">
                {this.houseSliderFrom(slides)}
                {this.houseDetailForm()}
                {this.houseContactForm()}
              </Row>
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md="6">
                  {this.houseNearByForm()}
                </Col>
                <Col md="6" style={{ marginLeft: -15 }}>
                  <GoogleMaps />
                </Col>
              </Row>
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md="6">
                  <h6>Mô tả thêm</h6>
                  <TextArea placeholder="Autosize height with minimum and maximum number of lines" value="Nhà 7 tầng THANG MÁY GARA ÔTÔ KINH DOANH đỉnh 60m2 MT4,8m giá 13.5tỷ

+ Nhà nằm tại vị trí đắc địa của Quận Cầu Giấy, trong khu phân lô, ÔTÔ chạy VÒNG QUANH, đường trước nhà ÔTÔ TRÁNH nhau thoải mái.

+ Nhà xây mới, thiết kế hiện đại, mỗi tầng 2 phòng, giếng trời thông thoáng, THANG MÁY nhập khẩu.

+ Nhà dễ chuyển đổi công năng, ở hay KINH DOANH đều tuyệt.

+ Sổ đẹp như HOA HẬU, NỞ, chính chủ pháp lý rõ ràng.

Liên hệ Mr Sơn: 0989 65 65 02 – 0919 65 65 02.

Chuyên Bất Động Sản Thổ Cư - Tư vấn tận tâm, chuyên nghiệp, trung thực.

Hỗ trợ thủ tục pháp lý, miễn phí 100% mọi dịch vụ cho khách." autosize={{ minRows: 12, maxRows: 12 }} />
                </Col>
                <Col md="6">
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
                    <Col md="7">
                      <label>Tư vấn</label>
                      <TextArea rows={5} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
