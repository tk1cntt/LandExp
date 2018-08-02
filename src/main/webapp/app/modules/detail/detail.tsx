import './detail.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Flex, Carousel, Drawer, NavBar, WingBlank, WhiteSpace } from 'antd-mobile';

import SideBar from 'app/shared/layout/menu/sidebar';

import { getLandType, getDirection, getMoney, humanize, encodeId, decodeId } from 'app/shared/util/utils';
import { getEntity as getHouse } from 'app/entities/house/house.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any; link: any }> { }

export interface IDetailState {
  images: any;
  imgHeight: any;
  open: any;
}

export class Detail extends React.Component<IDetailProp, IDetailState> {
  state: IDetailState = {
    imgHeight: 'auto',
    images: [],
    open: false
  };

  componentDidMount() {
    const houseId = decodeId(this.props.match.params.id);
    this.props.getHouse(houseId);
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

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }

  houseAdressFull() {
    return (
      <>
        {this.props.houseEntity.address}, {this.props.houseEntity.wardType} {this.props.houseEntity.wardName},{' '}
        {this.props.houseEntity.districtType} {this.props.houseEntity.districtName}, {this.props.houseEntity.cityName}
      </>
    );
  }

  houseDetailForm() {
    return (
      <div className="product-info">
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
          <a href="#" className="like">
            <img src="/content/images/icon/like.png" alt="" />Yêu thích
          </a>
          <a href="#" className="report">
            <img src="/content/images/icon/warning.png" alt="" />Báo xấu
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <NavBar icon={<Icon type="bars" />} onLeftClick={this.onOpenChange}>
          <img src="/content/images/logo.png" />
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 10 }}
          sidebar={<SideBar />}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="flex-container">
            <Flex>
              <Flex.Item>
                <Carousel
                  autoplay={false}
                  infinite
                >
                  {this.props.housePhotoList.map((file, i) => (
                    <img
                      src={`${SERVER_API_URL}/api/house-photos/${encodeId(file.id)}/contents/${this.props.houseEntity.link}-${encodeId(
                        file.id
                      )}.jpg`}
                      style={{ width: '100%', verticalAlign: 'top' }}
                    />
                  ))}
                </Carousel>
              </Flex.Item>
            </Flex>
            <WhiteSpace size="md" />
            <Flex>
              <Flex.Item>
                {this.houseDetailForm()}
              </Flex.Item>
            </Flex>
            <WhiteSpace size="md" />
          </div>
        </Drawer>
      </div>
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

const mapDispatchToProps = { getHouse, getImageOfHouse };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
