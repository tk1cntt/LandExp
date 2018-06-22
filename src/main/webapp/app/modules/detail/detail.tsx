import './detail.css';

import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Carousel, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import { getEntity } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';

import SearchPage from 'app/modules/search/search-page';
import GoogleMaps from 'app/shared/util/google-maps';

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> { }

export interface IDetailState {
  search: string;
}

export class Detail extends React.Component<IDetailProp, IDetailState> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.key);
    this.props.getImageOfHouse(parseInt(this.props.match.params.key));
  }

  houseSliderFrom(slides: any) {
    return (
      <Col md="6">
        <div className="justify-content-center" style={{ border: '1px solid #dfdfdf' }}>
          <Carousel autoplay>
            {slides}
          </Carousel>
        </div>
      </Col>);
  }

  houseDetailForm() {
    return (
      <Col md="3" className="product-info">
        <div className="type">Căn hộ chung cư</div>
        <p className="post-date">31/05/2018</p>
        <p className="price"><span>5</span> triệu/tháng</p>
        <div className="property">
          <p className="compact">Diện tích:<span>60m2</span></p>
          <p className="compass">Hướng:<span>Tây bắc</span></p>
          <p className="bedroom">Phòng ngủ:<span>2</span></p>
          <p className="bathroom">Phòng tắm:<span>1</span></p>
          <p className="gara">Chỗ để ô tô:<span>có</span></p>
        </div>
        <div className="location">
          <span className="title">Địa chỉ</span>
          <p>Số 2/232 Trần Kim Xuyến, Trung Hòa, Cầu Giấy, TP Hà Nội</p>
        </div>
        <div className="button-group">
          <a href="#" className="like"><img src="static/images/icon/like.png" alt="" />Yêu thích</a>
          <a href="#" className="report"><img src="static/images/icon/warning.png" alt="" />Báo xấu</a>
        </div>
      </Col>);
  }

  houseContactForm() {
    return (
      <Col md="3" className="contact-box">
        <div className="contact">
          <div>Liên hệ chủ nhà</div>
          <p><FontAwesomeIcon icon="user" /> Hoàng Lê Khánh</p>
          <p><FontAwesomeIcon icon="mobile" /> 0941 968383</p>
          <p><FontAwesomeIcon icon="envelope" /> khanhlh@gmail.com</p>
        </div>
        <div className="call-chat">
          <a href="#" className="call">Gọi điện</a>
          <a href="#" className="chat">Chat</a>
        </div>
        <div className="contact">
          <div>Thời gian xem bất động sản</div>
          <p><FontAwesomeIcon icon="square" /> 17h - 19h các ngày trong tuần</p>
          <p><FontAwesomeIcon icon="square" /> 10h - 12h các ngày thứ 7, chủ nhật</p>
          <p className="text-center"><a href="#" type="button" className="btn btn-default">Đặt lịch xem</a></p>
        </div>
      </Col>);
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
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
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
                    <Tabs defaultActiveKey="1" style={{ border: '1px solid #dfdfdf', padding: 10, minHeight: 400, maxHeight: 400 }}>
                      <TabPane tab={<span><FontAwesomeIcon icon="utensils" /> Nhà hàng</span>} key="1">Content of Tab Pane 1</TabPane>
                      <TabPane tab={<span><FontAwesomeIcon icon="shopping-cart" /> Mua sắm</span>} key="2">Content of Tab Pane 2</TabPane>
                      <TabPane tab={<span><FontAwesomeIcon icon="graduation-cap" /> Trường học</span>} key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                  </Col>
                  <Col md="6" style={{ marginLeft: -15 }}>
                    <GoogleMaps />
                  </Col>
                </Row>
                <Row style={{ marginTop: 10, marginBottom: 10 }}>
                  <Col md="6">
                    <Tabs defaultActiveKey="1" style={{ border: '1px solid #dfdfdf', padding: 10, minHeight: 400, maxHeight: 400 }}>
                      <TabPane tab={<span><FontAwesomeIcon icon="utensils" /> Nhà hàng</span>} key="1">Content of Tab Pane 1</TabPane>
                      <TabPane tab={<span><FontAwesomeIcon icon="shopping-cart" /> Mua sắm</span>} key="2">Content of Tab Pane 2</TabPane>
                      <TabPane tab={<span><FontAwesomeIcon icon="graduation-cap" /> Trường học</span>} key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                  </Col>
                  <Col md="6" style={{ marginLeft: -15 }}>
                    <div className="col-md-8 consultant">
						          <h3>Tư vấn tài chính</h3>
						          <div className="cs-content">
							          <form action="" method="POST" role="form">
								          <div className="col-xs-5">
									          <div className="form-group">
										          <label >Giá trị nhà bạn muốn mua</label>
										          <input type="text" className="form-control" id="" placeholder="0.0" />
										          <span className="input-addon">VNĐ</span>
									          </div>
								          </div>
								          <div className="col-xs-5">
									          <div className="form-group">
										          <label >Số tiền tích lũy được hàng tháng</label>
										          <input type="text" className="form-control" id="" placeholder="0.0" />
										          <span className="input-addon">VNĐ</span>
									          </div>
								          </div>
								          <div className="col-xs-2">
									          <div className="form-group">
										          <label >Lãi suất vay</label>
										          <input type="text" className="form-control" id="" placeholder="0.0" />
										          <span className="input-addon">%</span>
									          </div>
								          </div>
									
								          <div className="col-xs-5">
									          <div className="form-group">
										          <label >Số tiền bạn có</label>
										          <input type="text" className="form-control" id="" placeholder="0.0" />
										          <span className="input-addon">VNĐ</span>
									          </div>
									          <div className="form-group">
										          <label >Số tiền bạn có thể vay người thân</label>
										          <input type="text" className="form-control" id="" placeholder="0.0" />
										          <span className="input-addon">VNĐ</span>
									          </div>
								          </div>
								          <div className="col-xs-7">
									          <label >Tư vấn</label>
								          </div>
								          <div className="col-xs-7 col-xs-offset-5">
									          <button type="submit" className="btn btn-info">Nhận tư vấn</button>
									          <a href="#" type="button" className="btn btn-success">Đăng ký vay</a>
								          </div>
								          <div className="clearfix"></div>
							          </form>
						          </div>
					          </div>
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
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { getEntity, getImageOfHouse };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
