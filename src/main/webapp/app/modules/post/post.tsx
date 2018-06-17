import './post.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { Steps, Button, Card } from 'antd';
const Step = Steps.Step;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getActionType, getLandType, getCityType, getDirection, getPresent } from 'app/shared/util/utils';

import { getEntity as getHouse, updateEntity as updateHouse } from '../../entities/house/house.reducer';
import { getEntities as getCities } from '../../entities/city/city.reducer';
import { getEntities as getServiceFees } from '../../entities/service-fee/service-fee.reducer';
import { createEntity as createPhoto, updateEntity as updatePhoto } from '../../entities/house-photo/house-photo.reducer';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import StepSix from './stepSix';
import StepSeven from './stepSeven';

export interface IPostProp extends StateProps, DispatchProps {}

export interface IPostState {
  current: any;
  house: any;
  alerts: any;
}

export class PostPage extends React.Component<IPostProp, IPostState> {
  state: IPostState = {
    current: 0,
    house: {},
    alerts: []
  };

  componentDidMount() {
    this.props.getSession();
    this.props.getHouse('init');
    this.props.getCities();
    this.props.getServiceFees();
  }

  next = () => {
    this.setState({ alerts: [] });
    this.validateStep(this.state.current);
    // const current = this.state.current + 1;
    // this.setState({ current });
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  validateStep = id => {
    switch (id) {
      case 0:
        this.validateStepOne();
        break;
      case 1:
        this.validateStepTwo();
        break;
      default:
        break;
    }
  }

  validateStepOne = () => {
    // console.log('Validate step one');
    const alerts = [];
    const actionTypeValue = this.state.house.actionType || this.props.house.actionType;
    const actionTypeForm = actionTypeValue ? null : (
      <Row key={'action-type-value-alert'}>
        <Col md="12">
          <Alert color="danger">
            Bạn phải chọn một hình thức bán
          </Alert>
        </Col>
      </Row>
    )
    alerts.push(actionTypeForm);
    const landTypeValue = this.state.house.landType || this.props.house.landType;
    const landTypeForm = landTypeValue ? null : (
      <Row key={'land-type-value-alert'}>
        <Col md="12">
          <Alert color="danger">
            Bạn phải chọn loại bất động sản
          </Alert>
        </Col>
      </Row>
    )
    alerts.push(landTypeForm);
    this.setState({ alerts });
    if (landTypeValue && actionTypeValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  }

  validateStepTwo = () => {
    // console.log('Validate step two');
  }

  saveEntity = () => {
    const { house } = this.props;
    const entity = {
      ...house,
      ...this.state.house
    };
    this.props.updateHouse(entity);
    if (entity.fileList) {
      entity.fileList.map(file => {
        const imageURL = file.thumbUrl;
        const block = imageURL.split(';');
        const realData = block[1].split(',')[1];
        if (file.photoId) {
          this.props.updatePhoto({ id: file.photoId, image: realData, imageContentType: file.type, houseId: this.props.house.id });
        } else {
          this.props.createPhoto({ image: realData, imageContentType: file.type, houseId: this.props.house.id });
        }
      });
    }
    this.next();
  };

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    this.setState({
      house: nextHouse
    });
  }
  render() {
    const { current, house } = this.state;
    const steps = [
      {
        title: 'Hình thức',
        content: <StepOne house={this.state.house || this.props.house} updateHouse={this.updateHouse} />
      },
      {
        title: 'Vị trí',
        content: <StepTwo updateHouse={this.updateHouse} />
      },
      {
        title: 'Đặc điểm',
        content: <StepThree updateHouse={this.updateHouse} />
      },
      {
        title: 'Hình ảnh',
        content: <StepFour updateHouse={this.updateHouse} />
      },
      {
        title: 'Giá',
        content: <StepFive updateHouse={this.updateHouse} />
      },
      {
        title: 'Liên hệ',
        content: <StepSix updateHouse={this.updateHouse} />
      },
      {
        title: 'Xác nhận',
        content: <StepSeven />
      },
      {
        title: 'Thanh toán',
        content: <StepSeven />
      }
    ];

    const actionTypeValue = this.state.house.actionType || this.props.house.actionType;
    const actionTypeForm = actionTypeValue ? (
      <Row>
        <Col md="6">1. Hình thức bán:</Col>
        <Col md="6">{getActionType(actionTypeValue)}</Col>
      </Row>
    ) : null;

    const landTypeValue = this.state.house.landType || this.props.house.landType;
    const landTypeForm = landTypeValue ? (
      <Row>
        <Col md="6">2. Loại bất động sản:</Col>
        <Col md="6">{getLandType(landTypeValue)}</Col>
      </Row>
    ) : null;

    const locationValue = this.state.house.address || this.props.house.address;
    const locationForm = locationValue ? (
      <Row>
        <Col md="12">3. Địa chỉ:</Col>
        <Col md="12">{locationValue}</Col>
      </Row>
    ) : null;

    const cityForm = this.state.house.cityId || this.props.house.cityId ? (
      <Row>
        <Col md="12">4. Tỉnh thành:</Col>
        <Col md="12">
          {
            getCityType({
              cities: this.props.cities,
              cityId: this.state.house.cityId || this.props.house.cityId,
              districtId: this.state.house.districtId || this.props.house.districtId,
              wardId: this.state.house.wardId || this.props.house.wardId
            })
          }
        </Col>
      </Row>
    ) : null;

    const acreageValue = this.state.house.acreage || this.props.house.acreage;
    const acreageForm = acreageValue ? (
      <Row>
        <Col md="6">Diện tích:</Col>
        <Col md="6">{acreageValue} m2</Col>
      </Row>
    ) : null;

    const acreageStreetSideValue = this.state.house.acreageStreetSide || this.props.house.acreageStreetSide;
    const acreageStreetSideForm = acreageStreetSideValue ? (
      <Row>
        <Col md="6">Mặt tiền:</Col>
        <Col md="6">{acreageStreetSideValue} m</Col>
      </Row>
    ) : null;

    const bedRoomValue = this.state.house.bedRoom || this.props.house.bedRoom;
    const bedRoomForm = bedRoomValue ? (
      <Row>
        <Col md="6">Phòng ngủ:</Col>
        <Col md="6">{bedRoomValue}</Col>
      </Row>
    ) : null;

    const bathRoomValue = this.state.house.bathRoom || this.props.house.bathRoom;
    const bathRoomForm = bathRoomValue ? (
      <Row>
        <Col md="6">Phòng tắm:</Col>
        <Col md="6">{bathRoomValue}</Col>
      </Row>
    ) : null;

    const floorValue = this.state.house.floor || this.props.house.floor;
    const floorForm = floorValue ? (
      <Row>
        <Col md="6">Tầng:</Col>
        <Col md="6">{floorValue}</Col>
      </Row>
    ) : null;

    const numberOfFloorValue = this.state.house.numberOfFloor || this.props.house.numberOfFloor;
    const numberOfFloorForm = numberOfFloorValue ? (
      <Row>
        <Col md="6">Số tầng:</Col>
        <Col md="6">{numberOfFloorValue}</Col>
      </Row>
    ) : null;

    const directionValue = this.state.house.direction || this.props.house.direction;
    const directionForm = directionValue ? (
      <Row>
        <Col md="6">Hướng nhà:</Col>
        <Col md="6">{getDirection(directionValue)}</Col>
      </Row>
    ) : null;

    const directionBalconyValue = this.state.house.directionBalcony || this.props.house.directionBalcony;
    const directionBalconyForm = directionBalconyValue ? (
      <Row>
        <Col md="6">Hướng ban công:</Col>
        <Col md="6">{getDirection(directionBalconyValue)}</Col>
      </Row>
    ) : null;

    const parkingValue = this.state.house.parking || this.props.house.parking;
    const parkingForm = parkingValue ? (
      <Row>
        <Col md="6">Chỗ để xe:</Col>
        <Col md="6">{parkingValue ? 'Có' : 'Không'}</Col>
      </Row>
    ) : null;

    const detailForm = acreageValue ? (
      <div>
        <Row>
          <Col md="12">5. Đặc điểm:</Col>
        </Row>
        {acreageForm}
        {acreageStreetSideForm}
        {bedRoomForm}
        {bathRoomForm}
        {floorForm}
        {numberOfFloorForm}
        {directionForm}
        {directionBalconyForm}
        {parkingForm}
      </div>
    ) : null;

    const moneyValue = this.state.house.money || this.props.house.money;
    const discountValue = this.state.house.discount || this.props.house.discount;

    const moneyForm = moneyValue && discountValue ? (
      <Row>
        <Col md="6">Giá đề xuất:</Col>
        <Col md="6">
          <div style={{ textDecoration: 'line-through', color: 'red' }}>
            {new Intl.NumberFormat().format(moneyValue)} VNĐ
          </div>
        </Col>
      </Row>
    ) : (
      <Row>
        <Col md="6">Giá đề xuất:</Col>
        <Col md="6">
          {new Intl.NumberFormat().format(moneyValue)} VNĐ
        </Col>
      </Row>
    );

    const discountForm = discountValue ? (
      <Row>
        <Col md="6">Giá bán mong muốn:</Col>
        <Col md="6">{new Intl.NumberFormat().format(discountValue)} VNĐ</Col>
      </Row>
    ) : null;

    const presentValue = this.state.house.present || this.props.house.present;
    const presentForm = presentValue ? (
      <Row>
        <Col md="6">Hỗ trợ sau khi bán:</Col>
        <Col md="6">{getPresent(presentValue)}</Col>
      </Row>
    ) : null;

    const priceForm = moneyValue ? (
      <div>
        <Row>
          <Col md="12">6. Giá bán:</Col>
        </Row>
        {moneyForm}
        {discountForm}
        {presentForm}
      </div>
    ) : null;

    const customerValue = this.state.house.customer || this.props.house.customer;
    const customerForm = customerValue ? (
      <Row>
        <Col md="6">Người liên hệ:</Col>
        <Col md="6">{customerValue}</Col>
      </Row>
    ) : null;

    const customerMobileValue = this.state.house.mobile || this.props.house.mobile;
    const customerMobileForm = customerMobileValue ? (
      <Row>
        <Col md="6">Số điện thoại:</Col>
        <Col md="6">{customerMobileValue}</Col>
      </Row>
    ) : null;

    const customerEmailValue = this.state.house.email || this.props.house.email;
    const customerEmailForm = customerValue ? (
      <Row>
        <Col md="6">Địa chỉ emai:</Col>
        <Col md="6">{customerEmailValue}</Col>
      </Row>
    ) : null;

    const customerZaloValue = this.state.house.zalo || this.props.house.zalo;
    const customerZaloForm = customerValue ? (
      <Row>
        <Col md="6">Tài khoản Facebook:</Col>
        <Col md="6">{customerZaloValue}</Col>
      </Row>
    ) : null;

    const customerFacebookValue = this.state.house.facebook || this.props.house.facebook;
    const customerFacebookForm = customerValue ? (
      <Row>
        <Col md="6">Tài khoản Facebook:</Col>
        <Col md="6">{customerFacebookValue}</Col>
      </Row>
    ) : null;

    const contactForm = customerValue ? (
      <div>
        <Row>
          <Col md="12">7. Liên hệ:</Col>
        </Row>
        {customerForm}
        {customerMobileForm}
        {customerEmailForm}
        {customerZaloForm}
        {customerFacebookForm}
      </div>
    ) : null;

    return (
      <Row>
        <Col md="12">
          <Steps size="small" current={current} style={{ padding: '10px' }}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </Col>
        <Col md="8">
          {this.state.alerts}
          <div style={{ marginTop: 10, background: '#ECECEC', height: '100%', padding: '5px' }}>
            <Card title="Thông tin về ngôi nhà của bạn" bordered={false} style={{ width: '100%', height: '100%' }}>
              <div className="steps-content">{steps[this.state.current].content}</div>
              <div className="steps-action" style={{ marginTop: 16 }}>
                {this.state.current > 0 && <Button style={{ marginRight: 8 }} onClick={this.prev}>Quay lại</Button>}
                {this.state.current < steps.length - 3 && (
                  <Button type="primary" onClick={this.next}>
                    Tiếp tục
                  </Button>
                )}
                {this.state.current === steps.length - 3 && (
                  <Button type="primary" onClick={this.saveEntity}>
                    Hoàn tất
                  </Button>
                )}
                {this.state.current === steps.length - 2 && (
                  <Button type="primary" onClick={this.next}>
                    Thanh toán
                  </Button>
                )}
                {this.state.current === steps.length - 1 && (
                  <Button type="primary" onClick={this.saveEntity}>
                    Done
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </Col>
        <Col md="4">
          <div style={{ marginTop: 10, background: '#ECECEC', height: '100%', padding: '5px' }}>
            <Card title="Thông tin về ngôi nhà của bạn" bordered={false} style={{ width: '100%', height: '100%' }}>
              {actionTypeForm}
              {landTypeForm}
              {locationForm}
              {cityForm}
              {detailForm}
              {priceForm}
              {contactForm}
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  house: storeState.house.entity,
  cities: storeState.city.entities,
  loading: storeState.house.loading,
  updating: storeState.house.updating
});

const mapDispatchToProps = { getSession, getHouse, updateHouse, createPhoto, updatePhoto, getCities, getServiceFees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
