import './detail-news.css';

import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Carousel, Tabs, Input, Button, Icon } from 'antd';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

import { Carousel as Album } from 'react-responsive-carousel';
import { getSession } from 'app/shared/reducers/authentication';
import GoogleMaps from 'app/shared/util/google-maps';

export interface IDetailProp extends StateProps, DispatchProps {}

/* tslint:disable-next-line */
export interface IDetailState {}

export class DetailNews extends React.Component<IDetailProp, IDetailState> {
  render() {
    const slides = [];
    const stypeNoImage = {
      textAlign: 'center',
      height: '376px',
      lineHeight: '376px',
      background: '#f8f9fa'
    };
    if (this.props.housePhotoList) {
      this.props.housePhotoList.map(file => {
        slides.push(<img key={file.id} className="center-cropped" src={`data:image/jpeg;base64,${file.image}`} />);
      });
    }
    if (slides.length === 0) {
      slides.push(
        <div style={stypeNoImage} className="justify-content-center">
          <h3>
            <Icon type="loading" />
          </h3>
        </div>
      );
    }
    return (
      <div>
        <div className="justify-content-center" style={{ border: '1px solid #dfdfdf' }}>
          <Album showArrows showThumbs={false} autoPlay>
            {slides}
          </Album>
        </div>
        <div className="listview-right">
          <div className="location">
            <h3>Bán căn hộ chung cư</h3>
          </div>
          <div className="description" id="description">
            <p>
              <span>Hình thức</span>Bán
            </p>
            <p>
              <span>Loại hình</span>Căn hộ chung cư
            </p>
            <p>
              <span>Dự án</span>Dự án Vinhomes D’Capitale
            </p>
            <div className="property-label">Mô tả</div>
            <div className="property">
              <span>
                <FontAwesomeIcon icon="square" /> 60m2
              </span>
              <span>
                <FontAwesomeIcon icon="bed" /> 2
              </span>
              <span>
                <FontAwesomeIcon icon="bath" /> 1
              </span>
              <span>
                <FontAwesomeIcon icon="car" style={{ marginRight: '5px' }} /> <FontAwesomeIcon icon="check" />
              </span>
            </div>
            <div className="content">
              <p>
                The crafting and the designing of the project is built with exceptional and well planned amenities to showcase a world
                within the four walls. The quality work and dedication in intending this concrete chic is an idea of lavish living. The well
                planned structures …
              </p>
            </div>
            <p>
              <a className="more" href="#">
                Xem thêm
              </a>
            </p>
          </div>
          <div className="location">
            <h3>
              Bản đồ vị trí Bất động sản <span className="address">22 Láng Hạ, Đống Đa, Hà Nội</span>
            </h3>
          </div>
          <Tabs defaultActiveKey="1" style={{ minHeight: 400, maxHeight: 400 }}>
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
          <div>
            <GoogleMaps />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailNews);
