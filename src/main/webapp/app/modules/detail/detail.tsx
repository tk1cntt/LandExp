import './detail.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { Carousel as Album } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
// import Lightbox from 'lightbox-react';

import { Tabs, Input, Spin } from 'antd';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

import { getLandType, getDirection, getMoney, encodeId, decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import Permission from 'app/shared/layout/no/Permission';
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import GoogleMaps from 'app/shared/util/google-maps';

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> {}

export interface IDetailState {
  search: string;
  isOpen: Boolean;
  photoIndex: any;
}

export class Detail extends React.Component<IDetailProp, IDetailState> {
  state: IDetailState = {
    search: null,
    isOpen: false,
    photoIndex: 0
  };

  componentDidMount() {
    const houseId = decodeId(this.props.match.params.id);
    this.props.getEntity(houseId);
    /* tslint:disable-next-line */
    this.props.getImageOfHouse(parseInt(houseId));
  }

  /*
  houseSliderFrom(slides: any) {
    return (
      <Col md="6">
        <div className="justify-content-center" style={{ border: '1px solid #dfdfdf' }}>
          <Album autoPlay>{slides}</Album>
        </div>
      </Col>
    );
  }
  */

  houseImageGalleryFrom(images: any) {
    return (
      <Col md="6">
        <div style={{ border: '1px solid #dfdfdf' }}>
          <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} autoPlay lazyLoad />
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
            Hướng:<span>{getDirection(this.props.houseEntity.direction)}</span>
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
            <img src="/static/images/icon/like.png" alt="" />Yêu thích
          </a>
          <a href="#" className="report">
            <img src="/static/images/icon/warning.png" alt="" />Báo xấu
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
          <p style={{ marginTop: 25 }} />
          <p className="text-center">
            <a className="btn btn-default">Đặt lịch xem</a>
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

  updateMarkerPosition = () => {};

  render() {
    const { loading, updating } = this.props;
    const slides = [];
    const images = [];
    if (this.props.housePhotoList) {
      this.props.housePhotoList.map(file => {
        images.push({
          original: `${SERVER_API_URL}/api/house-photos/${encodeId(file.id)}/contents/${this.props.houseEntity.link}-${encodeId(
            file.id
          )}.jpg`,
          thumbnail: `${SERVER_API_URL}/api/house-photos/${encodeId(file.id)}/contents/${this.props.houseEntity.link}-${encodeId(
            file.id
          )}.jpg`
        });
      });
    }
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          {this.props.loading && this.props.photoLoading ? (
            <Loading />
          ) : !this.props.houseEntity.id ? (
            <Row>
              <Col md="12">
                <Row>
                  <Permission />
                </Row>
              </Col>
            </Row>
          ) : (
            <Row>
              <Row id="product-content">
                {this.houseImageGalleryFrom(images)}
                {this.houseDetailForm()}
                {this.houseContactForm()}
              </Row>
              {/*isOpen && (
                <Lightbox
                  mainSrc={slides[photoIndex]}
                  nextSrc={slides[(photoIndex + 1) % slides.length]}
                  prevSrc={slides[(photoIndex + slides.length - 1) % slides.length]}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + slides.length - 1) % slides.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % slides.length,
                    })
                  }
                />
              )*/}
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md="12">
                  <h3 className="lo-title">
                    Bản đồ vị trí và tiện ích trong khu vực
                    <span>
                      {this.props.houseEntity.address}, {this.props.houseEntity.wardName}, {this.props.houseEntity.districtName},{' '}
                      {this.props.houseEntity.cityName}
                    </span>
                  </h3>
                </Col>
                <Col md="5">{this.houseNearByForm()}</Col>
                <Col md="7">
                  <GoogleMaps
                    updateMarkerPosition={this.updateMarkerPosition}
                    currentPosition={{ latitude: this.props.houseEntity.latitude, longitude: this.props.houseEntity.longitude }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md="5">
                  <h4>Mô tả thêm</h4>
                  <div className="product-desc" dangerouslySetInnerHTML={{ __html: this.props.houseEntity.summary }} />
                </Col>
                <Col md="7">
                  <h4>Tư vấn tài chính</h4>
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
                    <div className="col-xs-7 col-xs-offset-5">
                      <button type="submit" className="btn btn-info">
                        Nhận tư vấn
                      </button>
                      <button type="submit" className="btn btn-success">
                        Đăng ký vay
                      </button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Row>
          )}
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  houseEntity: storeState.house.entity,
  loading: storeState.house.loadingDetail,
  updating: storeState.house.updating,
  housePhotoList: storeState.housePhoto.entities,
  photoLoading: storeState.housePhoto.loading
});

const mapDispatchToProps = { getEntity, getImageOfHouse };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
