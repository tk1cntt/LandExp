import React from 'react';
import { Redirect, Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Container, Alert } from 'reactstrap';

import { Steps, Button, Card, Spin } from 'antd';
const Step = Steps.Step;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, encodeId, decodeId } from 'app/shared/util/utils';

import { getEntity as getHouse, updateEntity as updateHouse } from 'app/entities/house/house.reducer';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { getEntities as getServiceFees } from 'app/entities/service-fee/service-fee.reducer';
import { createEntity as createPhoto, updateEntity as updatePhoto, getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { getPaymentOfHouse } from 'app/entities/payment/payment.reducer';

import SearchPage from 'app/shared/layout/search/search-menu';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import StepSix from './stepSix';
import StepSeven from './stepSeven';

export interface IEditProp extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IEditState {
  current: any;
  house: any;
  alerts: any;
}

export class EditPage extends React.Component<IEditProp, IEditState> {
  state: IEditState = {
    current: 0,
    house: {},
    alerts: []
  };

  componentDidMount() {
    const houseId = decodeId(this.props.match.params.id);
    this.props.getHouse(houseId);
    this.props.getPaymentOfHouse(houseId);
    this.props.getImageOfHouse(houseId);
    this.props.getSession();
    this.props.getServiceFees();
  }

  next = () => {
    this.setState({ alerts: [] });
    this.validateStep(this.state.current);
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  validateStep = id => {
    switch (id) {
      case 0:
        this.validateStepOne();
        break;
      case 1:
        this.validateStepTwo();
        break;
      case 2:
        this.validateStepThree();
        break;
      case 3:
        this.validateStepFour();
        break;
      case 4:
        this.validateStepFive();
        break;
      case 5:
        this.validateStepSix();
        break;
      default:
        break;
    }
  };

  validateStepOne = () => {
    const alerts = [];
    const actionTypeValue = this.state.house.actionType || this.props.house.actionType;
    const actionTypeForm = actionTypeValue ? null : (
      <Row key={'action-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn một hình thức bán" />
        </Col>
      </Row>
    );
    alerts.push(actionTypeForm);
    const landTypeValue = this.state.house.landType || this.props.house.landType;
    const landTypeForm = landTypeValue ? null : (
      <Row key={'land-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn loại bất động sản" />
        </Col>
      </Row>
    );
    alerts.push(landTypeForm);
    this.setState({ alerts });
    if (landTypeValue && actionTypeValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepTwo = () => {
    const alerts = [];
    const cityValue = this.state.house.cityId || this.props.house.cityId;
    const cityForm = cityValue ? null : (
      <Row key={'city-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn một tỉnh thành" />
        </Col>
      </Row>
    );
    alerts.push(cityForm);
    const addressValue = this.state.house.address || this.props.house.address;
    const addressForm = addressValue ? null : (
      <Row key={'address-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập địa chỉ" />
        </Col>
      </Row>
    );
    alerts.push(addressForm);
    this.setState({ alerts });
    if (cityValue && addressValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepThree = () => {
    const alerts = [];
    const acreageValue = this.state.house.acreage || this.props.house.acreage;
    const acreageForm = acreageValue ? null : (
      <Row key={'city-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập diện tích nhà" />
        </Col>
      </Row>
    );
    alerts.push(acreageForm);
    this.setState({ alerts });
    if (acreageValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepFour = () => {
    const alerts = [];
    const imageValue = this.state.house.fileList && this.state.house.fileList.length !== 0;
    const imageForm = imageValue ? null : (
      <Row key={'image-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải thêm hình ảnh giới thiệu về ngôi nhà" />
        </Col>
      </Row>
    );
    alerts.push(imageForm);
    this.setState({ alerts });
    if (imageValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepFive = () => {
    const alerts = [];
    const moneyValue = this.state.house.money || this.props.house.money;
    const moneyForm = moneyValue ? null : (
      <Row key={'money-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập giá bán ngôi nhà" />
        </Col>
      </Row>
    );
    alerts.push(moneyForm);
    const saleTypeValue = this.state.house.saleType || this.props.house.saleType;
    const saleTypeForm = saleTypeValue ? null : (
      <Row key={'sale-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn một gói tin đăng" />
        </Col>
      </Row>
    );
    alerts.push(saleTypeForm);
    this.setState({ alerts });
    if (moneyValue && saleTypeValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepSix = () => {
    const alerts = [];
    const customerValue = this.state.house.customer || this.props.house.customer;
    const customerForm = customerValue ? null : (
      <Row key={'customer-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập tên người bán" />
        </Col>
      </Row>
    );
    alerts.push(customerForm);
    const mobileValue = this.state.house.mobile || this.props.house.mobile;
    const mobileForm = mobileValue ? null : (
      <Row key={'mobile-type-value-alert'}>
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập số điện thoại liên lạc" />
        </Col>
      </Row>
    );
    alerts.push(mobileForm);
    this.setState({ alerts });
    if (customerValue && mobileValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

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
          // this.props.updatePhoto({ id: file.photoId, image: realData, imageContentType: file.type, houseId: this.props.house.id });
        } else {
          this.props.createPhoto({ image: realData, imageContentType: file.type, houseId: this.props.house.id });
        }
      });
    }
    this.props.history.push(`/tai-khoan/xem-truoc-tin-dang/${encodeId(this.props.house.id)}`);
  };

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    this.setState({
      house: nextHouse
    });
  };

  updateHouseTypeInfo = () => {
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

    return (
      <div>
        {actionTypeForm}
        {landTypeForm}
      </div>
    );
  };

  updateHouseAdressInfo = () => {
    const locationValue = this.state.house.address || this.props.house.address;
    const locationForm = locationValue ? (
      <Row>
        <Col md="12">4. Địa chỉ:</Col>
        <Col md="12">{locationValue}</Col>
      </Row>
    ) : null;

    const cityValue = this.state.house.cityId || this.props.house.cityId;
    const cityForm = cityValue ? (
      <Row>
        <Col md="12">3. Tỉnh thành:</Col>
        <Col md="12">
          {getCityType({
            cities: this.props.cities,
            cityId: this.state.house.cityId || this.props.house.cityId,
            districtId: this.state.house.districtId || this.props.house.districtId,
            wardId: this.state.house.wardId || this.props.house.wardId
          })}
        </Col>
      </Row>
    ) : null;

    return (
      <div>
        {cityForm}
        {locationForm}
      </div>
    );
  };

  updateHouseDetailInfo = () => {
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

    return acreageValue ? (
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
  };

  updateHousePriceInfo = () => {
    const moneyValue = this.state.house.money || this.props.house.money;
    const discountValue = this.state.house.discount || this.props.house.discount;

    const moneyForm =
      moneyValue && discountValue ? (
        <Row>
          <Col md="6">Giá đề xuất:</Col>
          <Col md="6">
            <div style={{ textDecoration: 'line-through', color: 'red' }}>{new Intl.NumberFormat().format(moneyValue)} VNĐ</div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md="6">Giá đề xuất:</Col>
          <Col md="6">{new Intl.NumberFormat().format(moneyValue)} VNĐ</Col>
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

    const saleTypeValue = this.state.house.saleType || this.props.house.saleType;
    const sateTypeForm = saleTypeValue ? (
      <Row>
        <Col md="6">Gói tin đăng:</Col>
        <Col md="6">{getSaleType(presentValue)}</Col>
      </Row>
    ) : null;

    return moneyValue ? (
      <div>
        <Row>
          <Col md="12">6. Giá bán:</Col>
        </Row>
        {moneyForm}
        {discountForm}
        {presentForm}
        {sateTypeForm}
      </div>
    ) : null;
  };

  updateHouseContactInfo = () => {
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
    const customerEmailForm = customerEmailValue ? (
      <Row>
        <Col md="6">Địa chỉ emai:</Col>
        <Col md="6">{customerEmailValue}</Col>
      </Row>
    ) : null;

    const customerZaloValue = this.state.house.zalo || this.props.house.zalo;
    const customerZaloForm = customerZaloValue ? (
      <Row>
        <Col md="6">Tài khoản Zalo:</Col>
        <Col md="6">{customerZaloValue}</Col>
      </Row>
    ) : null;

    const customerFacebookValue = this.state.house.facebook || this.props.house.facebook;
    const customerFacebookForm = customerFacebookValue ? (
      <Row>
        <Col md="6">Tài khoản Facebook:</Col>
        <Col md="6">{customerFacebookValue}</Col>
      </Row>
    ) : null;

    return customerValue ? (
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
  };

  render() {
    const { current } = this.state;
    const { house } = this.props;
    const entity = {
      ...house,
      ...this.state.house
    };
    const steps = [
      {
        title: 'Đặc điểm',
        content: <StepThree house={entity} updateHouse={this.updateHouse} />
      },
      {
        title: 'Hình ảnh',
        content: <StepFour house={entity} updateHouse={this.updateHouse} />
      },
      {
        title: 'Giá',
        content: <StepFive house={entity} updateHouse={this.updateHouse} />
      }
    ];

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <div style={{ marginBottom: 20 }}>
            <Steps size="small" current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
          </div>
          <Row>
            <Spin spinning={this.props.loading} tip="Đang cập nhật dữ liệu...">
              <Col md="8">
                <Card bordered={false}>
                  <div className="steps-content">{steps[this.state.current].content}</div>
                  <div className="steps-action" style={{ marginTop: 16 }}>
                    {this.state.current > 0 && (
                      <Button style={{ marginRight: 8 }} onClick={this.prev}>
                        Quay lại
                      </Button>
                    )}
                    {this.state.current < steps.length - 1 && (
                      <Button type="primary" onClick={this.next}>
                        Tiếp tục
                      </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                      <Button type="primary" onClick={this.saveEntity}>
                        Hoàn tất
                      </Button>
                    )}
                  </div>
                  {this.state.alerts.map((item, index) => (
                    <div className="steps-action" key={index} style={{ marginTop: 10 }}>
                      {item}
                    </div>
                  ))}
                </Card>
              </Col>
              <Col md="4">
                <Card title="Thông tin về ngôi nhà của bạn" bordered={false}>
                  {this.updateHouseTypeInfo()}
                  {this.updateHouseAdressInfo()}
                  {this.updateHouseDetailInfo()}
                  {this.updateHousePriceInfo()}
                  {this.updateHouseContactInfo()}
                </Card>
              </Col>
            </Spin>
          </Row>
        </Container>
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

const mapDispatchToProps = {
  getSession,
  getHouse,
  updateHouse,
  createPhoto,
  updatePhoto,
  getImageOfHouse,
  getCities,
  getServiceFees,
  getPaymentOfHouse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);
