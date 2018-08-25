import './detail.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Row, Col, Container } from 'reactstrap';
// import { Carousel as Album } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
// import Lightbox from 'lightbox-react';
import { Helmet } from 'react-helmet';

import { Tabs, Input, Alert, notification } from 'antd';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

import { getLandType, getDirection, getMoney, formatMoney, humanize, encodeId, decodeId } from 'app/shared/util/utils';
import { getEntity } from 'app/entities/house/house.reducer';
import { createEntity as createUserLike } from 'app/entities/user-like/user-like.reducer';
import { createEntity as createUserFinancial } from 'app/entities/user-financial/user-financial.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

// import Permission from 'app/shared/layout/no/Permission';
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import GoogleMaps from 'app/shared/util/google-maps';

const openNotification = () => {
  notification['success']({
    message: 'Gửi thông tin thành công',
    description: 'Cám ơn bạn đã tin tưởng. Chúng tôi sẽ liên lạc với bạn sớm nhất.',
  });
};

const openLikeNotification = () => {
  notification['success']({
    message: 'Gửi thông tin thành công',
    description: 'Thông tin về ngôi ngày đã được lưu lại.',
  });
};

const openReportNotification = () => {
  notification['success']({
    message: 'Gửi thông tin thành công',
    description: 'Cám ơn bạn bạn đã báo cáo. Chúng tôi sẽ kiểm tra lại thông tin về ngôi nhà.',
  });
};

notification.config({
  placement: 'topRight',
  top: 50,
  duration: 3
});

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> {}

export interface IDetailState {
  images: any;
  housePrice: number;
  savingMoney: number;
  loanRate: number;
  loanFromPeople: number;
  customerMoneyHave: number;
  financialType: number;
  customerMobile: string;
  customerEmail: string;
  visible: any;
  alerts: any;
}

export class Detail extends React.Component<IDetailProp, IDetailState> {
  state: IDetailState = {
    images: [],
    housePrice: 0,
    savingMoney: 0,
    loanRate: 0,
    loanFromPeople: 0,
    customerMoneyHave: 0,
    financialType: null,
    customerMobile: null,
    customerEmail: null,
    visible: false,
    alerts: []
  };

  componentDidMount() {
    const houseId = decodeId(this.props.match.params.id);
    this.props.getEntity(houseId);
    /* tslint:disable-next-line */
    this.props.getImageOfHouse(parseInt(houseId));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.housePhotoList !== prevProps.housePhotoList) {
      this.mappingImages();
    }
  }

  mappingImages() {
    const images = [];
    if (this.props.housePhotoList) {
      this.props.housePhotoList.map(file => {
        images.push({
          original: `${SERVER_API_URL}/api/house-photos/${encodeId(file.id)}/contents/${this.props.houseEntity.link}-${encodeId(
            file.id
          )}.jpg`,
          thumbnail: `${SERVER_API_URL}/api/house-photos/${encodeId(file.id)}/thumbnails/${this.props.houseEntity.link}-${encodeId(
            file.id
          )}.jpg`
        });
      });
    }
    this.setState({
      images
    });
  }

  houseImageGalleryFrom(images: any) {
    return (
      <Col md="6">
        <div style={{ border: '1px solid #dfdfdf' }}>
          <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} autoPlay lazyLoad />
        </div>
      </Col>
    );
  }

  houseAdressFull() {
    return (
      <>
        {this.props.houseEntity.address}, {this.props.houseEntity.wardType} {this.props.houseEntity.wardName},{' '}
        {this.props.houseEntity.districtType} {this.props.houseEntity.districtName}, {this.props.houseEntity.cityName}
      </>
    );
  }

  onHandleUserLike = () => {
    // console.log('user report');
    const userLike = {
      userId: this.props.account.id,
      houseId: this.props.houseEntity.id,
      userType: 1
    }
    this.props.createUserLike(userLike);
    openLikeNotification();
  };

  onHandleUserReport = () => {
    // console.log('user report');
    const userLike = {
      userId: this.props.account.id,
      houseId: this.props.houseEntity.id,
      userType: 2
    }
    this.props.createUserLike(userLike);
    openReportNotification();
  };

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
          <p>{this.houseAdressFull()}</p>
        </div>
        <div className="button-group">
          <div className="user like" onClick={this.onHandleUserLike}>
            <img src="/static/images/icon/like.png" alt="" />Yêu thích
          </div>
          <div className="user report" onClick={this.onHandleUserReport}>
            <img src="/static/images/icon/warning.png" alt="" />Báo xấu
          </div>
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
              <i className="fa fa-home" /> Mua sắm
            </span>
          }
          key="1"
          className="nearby"
        >
          {this.props.houseEntity.restaurants &&
            this.props.houseEntity.restaurants.map((restaurant, i) => (
              <div key={`restaurant-id-${i}`}>
                <h3>
                  <div className="title">{restaurant.title}</div>
                  <span>{humanize(restaurant.distance ? restaurant.distance / 1000 : 0)}km</span>
                </h3>
                <p style={{ padding: 5 }}>{restaurant.address}</p>
              </div>
            ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fa fa-shopping-cart" /> Bệnh viện
            </span>
          }
          key="2"
          className="nearby"
        >
          {this.props.houseEntity.hospitals &&
            this.props.houseEntity.hospitals.map((hospital, i) => (
              <div key={`restaurant-id-${i}`}>
                <h3>
                  <div className="title">{hospital.title}</div>
                  <span>{humanize(hospital.distance ? hospital.distance / 1000 : 0)}km</span>
                </h3>
                <p style={{ padding: 5 }}>{hospital.address}</p>
              </div>
            ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fa fa-graduation-cap" /> Trường học
            </span>
          }
          key="3"
          className="nearby"
        >
          {this.props.houseEntity.schools &&
            this.props.houseEntity.schools.map((school, i) => (
              <div key={`restaurant-id-${i}`}>
                <h3>
                  <div className="title">{school.title}</div>
                  <span>{humanize(school.distance ? school.distance / 1000 : 0)}km</span>
                </h3>
                <p style={{ padding: 5 }}>{school.address}</p>
              </div>
            ))}
        </TabPane>
      </Tabs>
    );
  }

  updateMarkerPosition = () => {};

  onChangeHousePrice = values => {
    const { formattedValue, value } = values;
    this.setState({
      housePrice: value
    });
  };

  onChangeSavingMoney = values => {
    const { formattedValue, value } = values;
    this.setState({
      savingMoney: value
    });
  };

  onChangeLoanRate = e => {
    this.setState({
      loanRate: e.target.value
    });
  };

  onChangeCustomerMoneyHave = values => {
    const { formattedValue, value } = values;
    this.setState({
      customerMoneyHave: value
    });
  };

  onChangeLoanFromPeople = values => {
    const { formattedValue, value } = values;
    this.setState({
      loanFromPeople: value
    });
  };

  onChangeCustomerMobile = e => {
    this.setState({
      customerMobile: e.target.value
    });
  };

  validateUserFinancial() {
    if (this.state.housePrice === 0 || this.state.housePrice === 0 || this.state.housePrice === 0) {
      return false;
    }
    return true;
  }

  onClickUserFinancialGetAdvice = () => {
    this.setState({
      financialType: 1
    });
    const alerts = [];
    const userFinancialInfo = this.validateUserFinancial() ? null : (
      <Row key={'action-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn hãy nhập đầy đủ thông tin để chúng tôi tư vấn cho bạn chính xác nhất" />
        </Col>
      </Row>
    );
    alerts.push(userFinancialInfo);

    const customerMobile = this.state.customerMobile;
    const customerMobileForm = customerMobile ? null : (
      <Row key={'action-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn hãy nhập số điện để chúng tôi tư vấn cho bạn nhanh chóng nhất" />
        </Col>
      </Row>
    );
    alerts.push(customerMobileForm);
    this.setState({ alerts });
    if (customerMobile && this.validateUserFinancial()) {
      const userFinancialData = {
        ...this.state
      };
      // add data
      this.props.createUserFinancial(userFinancialData);
      openNotification();
    }
  };

  onClickUserFinancialLoanRegistration = () => {
    this.setState({
      financialType: 2
    });
    const alerts = [];
    const userFinancialInfo = this.validateUserFinancial() ? null : (
      <Row key={'action-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn hãy nhập đầy đủ thông tin để chúng tôi tư vấn cho bạn chính xác nhất" />
        </Col>
      </Row>
    );
    alerts.push(userFinancialInfo);

    const customerMobile = this.state.customerMobile;
    const customerMobileForm = customerMobile ? null : (
      <Row key={'action-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn hãy nhập số điện để chúng tôi tư vấn cho bạn nhanh chóng nhất" />
        </Col>
      </Row>
    );
    alerts.push(customerMobileForm);
    this.setState({ alerts });
    if (customerMobile && this.validateUserFinancial()) {
      const userFinancialData = {
        ...this.state
      };
      // add data
      this.props.createUserFinancial(userFinancialData);
      openNotification();
    }
  };

  houseUserFinancialForm() {
    let userFinancialResult;
    if (this.state.housePrice !== 0 && this.state.savingMoney !== 0 && this.state.loanRate !== 0) {
      const needMoney = this.state.housePrice - this.state.customerMoneyHave - this.state.loanFromPeople;
      const loadMonth = needMoney / (this.state.savingMoney - (needMoney * this.state.loanRate) / (100 * 12));
      const minimumSavingMoney = (needMoney * this.state.loanRate) / (100 * 12) + needMoney / 240;
      if (minimumSavingMoney > this.state.savingMoney) {
        userFinancialResult = `Số tiền tích lũy hàng tháng của bạn cần lớn hơn ${formatMoney(minimumSavingMoney)} để đủ mua ngôi nhà này`;
      } else {
        userFinancialResult =
          `Bạn cần vay số tiền ${formatMoney(needMoney)} VNĐ` +
          ` trong vòng ${humanize(loadMonth)} tháng với số tiền tích lũy hàng tháng không nhỏ hơn ${formatMoney(minimumSavingMoney)} VNĐ ` +
          `để có thể mua được ngôi nhà này`;
      }
    }
    return (
      <>
        <h4>Tư vấn tài chính</h4>
        <Row className="cs-content">
          <Col md="5">
            <div className="form-group">
              <label>Giá trị nhà bạn muốn mua</label>
              <NumberFormat
                displayType={'input'}
                customInput={Input}
                thousandSeparator
                placeholder="0.0"
                onValueChange={this.onChangeHousePrice}
              />
              <span className="input-addon">VNĐ</span>
            </div>
          </Col>
          <Col md="5" style={{ marginLeft: -12 }}>
            <div className="form-group">
              <label>Số tiền tích lũy hàng tháng</label>
              <NumberFormat
                displayType={'input'}
                customInput={Input}
                thousandSeparator
                placeholder="0.0"
                onValueChange={this.onChangeSavingMoney}
              />
              <span className="input-addon">VNĐ</span>
            </div>
          </Col>
          <Col md="2">
            <div className="form-group">
              <label>Lãi vay</label>
              <Input placeholder="0.0" onChange={this.onChangeLoanRate} />
              <span className="input-addon">%</span>
            </div>
          </Col>
          <Col md="5">
            <div className="form-group">
              <label>Số tiền bạn có</label>
              <NumberFormat
                displayType={'input'}
                customInput={Input}
                thousandSeparator
                placeholder="0.0"
                onValueChange={this.onChangeCustomerMoneyHave}
              />
              <span className="input-addon">VNĐ</span>
            </div>
            <div className="form-group">
              <label>Số tiền bạn có thể vay</label>
              <NumberFormat
                displayType={'input'}
                customInput={Input}
                thousandSeparator
                placeholder="0.0"
                onValueChange={this.onChangeLoanFromPeople}
              />
              <span className="input-addon">VNĐ</span>
            </div>
            <div className="form-group">
              <label>Số điện thoại nhận tư vấn</label>
              <Input onChange={this.onChangeCustomerMobile} />
            </div>
          </Col>
          <Col md="7" style={{ marginLeft: -12 }}>
            <label>Tư vấn</label>
            <TextArea
              rows={6}
              style={{ marginBottom: 25 }}
              placeholder="Bạn cần vay số tiền { } VNĐ trong vòng { } năm với số tiền tích lũy hàng tháng không nhỏ hơn { } VNĐ để có thể mua được ngôi nhà này"
              value={userFinancialResult}
            />
            <button className="btn btn-info" onClick={this.onClickUserFinancialGetAdvice}>
              Nhận tư vấn
            </button>
            {'  '}
            <button className="btn btn-success" onClick={this.onClickUserFinancialLoanRegistration}>
              Đăng ký vay
            </button>
          </Col>
          {this.state.alerts.map((item, index) => (
            <div className="steps-action" key={index} style={{ marginTop: 10 }}>
              {item}
            </div>
          ))}
        </Row>
      </>
    );
  }

  render() {
    return (
      <Row>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.props.houseEntity.title}</title>
        </Helmet>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          {this.props.loading && this.props.photoLoading ? (
            <Loading />
          ) : (
            <Row>
              <Row id="product-content">
                {this.houseImageGalleryFrom(this.state.images)}
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
              <Row style={{ marginBottom: 20 }} className="location-search">
                <Col md="12">
                  <h3 className="lo-title">
                    Bản đồ vị trí và tiện ích trong khu vực
                    <span>{this.houseAdressFull()}</span>
                  </h3>
                </Col>
                <Col md="5">{this.houseNearByForm()}</Col>
                <Col md="7">
                  <GoogleMaps
                    updateMarkerPosition={this.updateMarkerPosition}
                    isMarkerDraggable={false}
                    currentPosition={{ latitude: this.props.houseEntity.latitude, longitude: this.props.houseEntity.longitude }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col md="5">
                  <h4>Mô tả thêm</h4>
                  <div className="product-desc" dangerouslySetInnerHTML={{ __html: this.props.houseEntity.summary }} />
                </Col>
                <Col md="7">{this.houseUserFinancialForm()}</Col>
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
  photoLoading: storeState.housePhoto.loading,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getEntity, getImageOfHouse, createUserLike, createUserFinancial };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
