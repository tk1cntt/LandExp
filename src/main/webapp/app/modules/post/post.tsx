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
import { getActionType, getLandType, getCityType } from 'app/shared/util/utils';

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
}

export class PostPage extends React.Component<IPostProp, IPostState> {
  state: IPostState = {
    current: 0,
    house: {}
  };

  componentDidMount() {
    this.props.getSession();
    this.props.getHouse('init');
    this.props.getCities();
    this.props.getServiceFees();
  }

  next = () => {
    this.validateStep(this.state.current);
    const current = this.state.current + 1;
    this.setState({ current });
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
        content: <StepOne updateHouse={this.updateHouse} />
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

    console.log(this.state.house);
    console.log(this.props.house);

    const actionTypeForm = this.state.house.actionType || this.props.house.actionType ? (
      <Row>
        <Col md="6">Hình thức bán:</Col>
        <Col md="6">{getActionType(this.state.house.actionType || this.props.house.actionType)}</Col>
      </Row>
    ) : null;

    const landTypeForm = this.state.house.landType || this.props.house.landType ? (
      <Row>
        <Col md="6">Loại bất động sản:</Col>
        <Col md="6">{getLandType(this.state.house.landType || this.props.house.landType)}</Col>
      </Row>
    ) : null;

    const locationForm = this.state.house.address || this.props.house.address ? (
      <Row>
        <Col md="12">Địa chỉ:</Col>
        <Col md="12">{this.state.house.address || this.props.house.address}</Col>
      </Row>
    ) : null;

    const cityForm = this.state.house.cityId || this.props.house.cityId ? (
      <Row>
        <Col md="12">Tỉnh thành:</Col>
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

    return (
      <Row>
        <Col md="12">
          <Steps size="small" current={current} style={{ padding: '10px' }}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </Col>
        <Col md="8">
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
