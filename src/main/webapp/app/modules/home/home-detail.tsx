import './home.css';

import React from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import { Tabs, Input } from 'antd';
const TabPane = Tabs.TabPane;

import { getSession } from 'app/shared/reducers/authentication';
import { getLandType, getDirection, humanize, encodeId } from 'app/shared/util/utils';
import { SERVER_API_URL } from 'app/config/constants';

import Loading from 'app/shared/layout/loading/loading';
import GoogleMaps from 'app/shared/util/google-maps';

export interface IHomeProp extends StateProps, DispatchProps {}

export class HomeDetail extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getSession();
  }

  houseImageGalleryFrom(images: any) {
    return (
      <div style={{ border: '1px solid #dfdfdf' }}>
        <ImageGallery items={images} showThumbnails={false} showPlayButton={false} showFullscreenButton={false} autoPlay lazyLoad />
      </div>
    );
  }

  updateMarkerPosition = () => {};

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
                  <span>{humanize(restaurant.distance / 1000)}km</span>
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
            this.props.houseEntity.hospitals.map((restaurant, i) => (
              <div key={`restaurant-id-${i}`}>
                <h3>
                  <div className="title">{restaurant.title}</div>
                  <span>{humanize(restaurant.distance / 1000)}km</span>
                </h3>
                <p style={{ padding: 5 }}>{restaurant.address}</p>
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
            this.props.houseEntity.schools.map((restaurant, i) => (
              <div key={`restaurant-id-${i}`}>
                <h3>
                  <div className="title">{restaurant.title}</div>
                  <span>{humanize(restaurant.distance / 1000)}km</span>
                </h3>
                <p style={{ padding: 5 }}>{restaurant.address}</p>
              </div>
            ))}
        </TabPane>
      </Tabs>
    );
  }

  render() {
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
      <>
        {this.props.loading && this.props.photoLoading ? (
          <Loading />
        ) : (
          <>
            {this.houseImageGalleryFrom(images)}
            <h3 style={{ marginTop: 20 }}>Bán căn hộ chung cư</h3>
            <ul className="tab">
              <li className="active">
                <a>MÔ TẢ CƠ BẢN</a>
              </li>
              <li>
                <a>VỊ TRÍ &amp; TIỆN ÍCH</a>
              </li>
              <li>
                <a>LIÊN HỆ</a>
              </li>
              <li>
                <a>THÔNG TIN KHÁC</a>
              </li>
            </ul>
            <div className="description" id="description">
              <p>
                <span>Hình thức</span>Bán
              </p>
              <p>
                <span>Loại hình</span>
                {getLandType(this.props.houseEntity.landType)}
              </p>
              <p>
                <span>Dự án</span>Dự án Vinhomes D’Capitale
              </p>
              <div className="property-label">Mô tả</div>
              <div className="property">
                <span className="compact">{this.props.houseEntity.acreage}m2</span>
                <span className="bedroom">{this.props.houseEntity.bedRoom}</span>
                <span className="bathroom">{this.props.houseEntity.bathRoom}</span>
                <span className="compass">{getDirection(this.props.houseEntity.direction)}</span>
                <span className="floor">Tầng {this.props.houseEntity.floor}</span>
                <span className="gara">
                  {this.props.houseEntity.parking ? <i className="fa fa-check" /> : <i className="fa fa-times" />}
                </span>
              </div>
              <div className="content">
                <p dangerouslySetInnerHTML={{ __html: this.props.houseEntity.summary }} />
              </div>
              <p>
                <a className="more" href="#">
                  Xem thêm
                </a>
              </p>
            </div>
            <div className="location">
              <h3 style={{ marginTop: 20 }}>
                Bản đồ vị trí Bất động sản <span className="address">{this.props.houseEntity.fullAddress}</span>
              </h3>
              {this.houseNearByForm()}
              <div id="map" style={{ marginTop: 20 }}>
                <GoogleMaps
                  updateMarkerPosition={this.updateMarkerPosition}
                  isMarkerDraggable={false}
                  currentPosition={{ latitude: this.props.houseEntity.latitude, longitude: this.props.houseEntity.longitude }}
                />
              </div>
            </div>
            <div className="contact-info">
              <div className="row">
                <div className="col-sm-6 personal description">
                  <h3 style={{ marginTop: 20 }}>Liên hệ</h3>
                  <p>
                    <span>Họ tên</span>
                    {this.props.houseEntity.customer}
                  </p>
                  <p>
                    <span>Số điện thoại</span>
                    {this.props.houseEntity.mobile}
                  </p>
                  <p>
                    <span>Email</span>
                    {this.props.houseEntity.email}
                  </p>
                  <p>
                    <span>Zalo</span>
                    {this.props.houseEntity.zalo}
                  </p>
                  <p>
                    <span>Messenger</span>
                    {this.props.houseEntity.facebook}
                  </p>
                </div>
                <div className="col-sm-6 time-to-view">
                  <h3 style={{ marginTop: 20 }}>Thời gian xem bất động sản</h3>
                  <p>17h - 19h các ngày trong tuần 10h - 12h các ngày thứ 7, chủ nhật</p>
                </div>
              </div>
            </div>
            {/*}
            <div className="other-info">
              <h3 style={{ marginTop: 20 }}>Thông tin khác</h3>
              <div className="row">
                <div className="col-sm-4 text-center">
                  <div className="circle orange-bd">200</div>
                  <p>Lượt tìm kiếm</p>
                </div>
                <div className="col-sm-4 text-center">
                  <div className="circle green-bd">210</div>
                  <p>Lượt xem</p>
                </div>
                <div className="col-sm-4 text-center">
                  <div className="circle red-bd">10</div>
                  <p>Lượt yêu thích</p>
                </div>
              </div>
            </div>
            <div className="related">
              <h3 style={{ marginTop: 20 }}>
                Có thể bạn quan tâm
                <span className="tool-box">
                  <a className="prev">
                    <span className="fa fa-chevron-left" />
                  </a>
                  <a className="next">
                    <span className="fa fa-chevron-right" />
                  </a>
                </span>
              </h3>
              <div className="row">
                <div className="post-container">
                  <div className="related-carousel">
                    <ul>
                      <li className="post-item">
                        <div className="item-thumbnail">
                          <a href="#">
                            <img src="/static/upload/products/item-1.png" />
                          </a>
                          <div className="type ban">BÁN</div>
                          <a href="#" className="like-button">
                            <i className="fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="item-info">
                          <a href="#">
                            <h3 className="title">Căn hộ chung cư</h3>
                          </a>
                          <p className="subtitle">Dự án Vinhome D’Capital</p>
                          <p className="price">
                            <span>4,5</span> tỷ
                          </p>
                          <div className="post-date">
                            Ngày đăng <span>31/5/2018</span>
                          </div>
                          <div className="property">
                            <span className="compact">60m2</span>
                            <span className="bedroom">2</span>
                            <span className="bathroom">1</span>
                            <span className="gara">
                              <i className="fa fa-check" />
                            </span>
                          </div>
                          <p className="location">Quận Đống Đa, Hà Nội</p>
                        </div>
                        <div className="clearfix" />
                      </li>
                      <li className="post-item">
                        <div className="item-thumbnail">
                          <a href="#">
                            <img src="/static/upload/products/item-1.png" />
                          </a>
                          <div className="type ban">BÁN</div>
                          <a href="#" className="like-button">
                            <i className="fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="item-info">
                          <a href="#">
                            <h3 className="title">Căn hộ chung cư</h3>
                          </a>
                          <p className="subtitle">Dự án Vinhome D’Capital</p>
                          <p className="price">
                            <span>4,5</span> tỷ
                          </p>
                          <div className="post-date">
                            Ngày đăng <span>31/5/2018</span>
                          </div>
                          <div className="property">
                            <span className="compact">60m2</span>
                            <span className="bedroom">2</span>
                            <span className="bathroom">1</span>
                            <span className="gara">
                              <i className="fa fa-check" />
                            </span>
                          </div>
                          <p className="location">Quận Đống Đa, Hà Nội</p>
                        </div>
                        <div className="clearfix" />
                      </li>
                      <li className="post-item">
                        <div className="item-thumbnail">
                          <a href="#">
                            <img src="/static/upload/products/item-1.png" />
                          </a>
                          <div className="type ban">BÁN</div>
                          <a href="#" className="like-button">
                            <i className="fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="item-info">
                          <a href="#">
                            <h3 className="title">Căn hộ chung cư</h3>
                          </a>
                          <p className="subtitle">Dự án Vinhome D’Capital</p>
                          <p className="price">
                            <span>4,5</span> tỷ
                          </p>
                          <div className="post-date">
                            Ngày đăng <span>31/5/2018</span>
                          </div>
                          <div className="property">
                            <span className="compact">60m2</span>
                            <span className="bedroom">2</span>
                            <span className="bathroom">1</span>
                            <span className="gara">
                              <i className="fa fa-check" />
                            </span>
                          </div>
                          <p className="location">Quận Đống Đa, Hà Nội</p>
                        </div>
                        <div className="clearfix" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {*/}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  loading: storeState.house.loadingDetail,
  houseEntity: storeState.house.entity,
  housePhotoList: storeState.housePhoto.entities,
  photoLoading: storeState.housePhoto.loading
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeDetail);
