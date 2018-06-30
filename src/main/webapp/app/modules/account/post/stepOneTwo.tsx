import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Row as AntdRow, Col as AntdCol, Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getActionType, getLandType } from 'app/shared/util/utils';

export interface IStepOneProp extends StateProps, DispatchProps {
  updateHouse: Function;
  house: any;
}

export interface IStepOneState {
  landType: any;
  actionType: any;
}

export class StepOne extends React.Component<IStepOneProp, IStepOneState> {
  state: IStepOneState = {
    landType: null,
    actionType: null
  };

  onChangeActionType = e => {
    this.setState({
      actionType: e.target.value
    });
    this.props.updateHouse({
      actionType: e.target.value
    });
  };

  onChangeItemActionType = e => {
    this.setState({
      actionType: e.target.value
    });
    this.props.updateHouse({
      actionType: e.target.value
    });
  };

  onChangeLandType = e => {
    this.setState({
      landType: e.target.value
    });
    this.props.updateHouse({
      landType: e.target.value
    });
  };

  onChangeItemLandType = e => {
    this.setState({
      landType: e.target.value
    });
    this.props.updateHouse({
      landType: e.target.value
    });
  };

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          <AntdRow type="flex" justify="center" align="middle">
            <h3 className="text-center">
              <strong>Chọn loại bất động sản bạn muốn bán</strong>
            </h3>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow className="cc-selector" type="flex" justify="space-around" align="middle">
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'APARTMENT' ? true : false}
                    id="aparment"
                    type="radio"
                    name="land-type"
                    value="APARTMENT"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc aparment" htmlFor="aparment" />
                </div>
                <p>{getLandType('APARTMENT')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'HOME' ? true : false}
                    id="home"
                    type="radio"
                    name="land-type"
                    value="HOME"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc home" htmlFor="home" />
                </div>
                <p>{getLandType('HOME')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'HOME_VILLA' ? true : false}
                    id="home-villa"
                    type="radio"
                    name="land-type"
                    value="HOME_VILLA"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc home-villa" htmlFor="home-villa" />
                </div>
                <p>{getLandType('HOME_VILLA')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'HOME_STREET_SIDE' ? true : false}
                    id="home-street-side"
                    type="radio"
                    name="land-type"
                    value="HOME_STREET_SIDE"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc home-street-side" htmlFor="home-street-side" />
                </div>
                <p>{getLandType('HOME_STREET_SIDE')}</p>
              </div>
            </AntdCol>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow className="cc-selector" type="flex" justify="space-around" align="middle">
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'LAND_SCAPE' ? true : false}
                    id="land-scape"
                    type="radio"
                    name="land-type"
                    value="LAND_SCAPE"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc land-scape" htmlFor="land-scape" />
                </div>
                <p>{getLandType('LAND_SCAPE')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'LAND_OF_PROJECT' ? true : false}
                    id="land-of-project"
                    type="radio"
                    name="land-type"
                    value="LAND_OF_PROJECT"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc land-of-project" htmlFor="land-of-project" />
                </div>
                <p>{getLandType('LAND_OF_PROJECT')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'LAND_FARM' ? true : false}
                    id="land-farm"
                    type="radio"
                    name="land-type"
                    value="LAND_FARM"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc land-farm" htmlFor="land-farm" />
                </div>
                <p>{getLandType('LAND_FARM')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'LAND_RESORT' ? true : false}
                    id="land-resort"
                    type="radio"
                    name="land-type"
                    value="LAND_RESORT"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc land-resort" htmlFor="land-resort" />
                </div>
                <p>{getLandType('LAND_RESORT')}</p>
              </div>
            </AntdCol>
          </AntdRow>
        </Col>
        <Col md="12">
          <AntdRow className="cc-selector" type="flex" justify="space-around" align="middle">
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'OFFICE' ? true : false}
                    id="office"
                    type="radio"
                    name="land-type"
                    value="OFFICE"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc office" htmlFor="office" />
                </div>
                <p>{getLandType('OFFICE')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'WAREHOUSES' ? true : false}
                    id="warehouses"
                    type="radio"
                    name="land-type"
                    value="WAREHOUSES"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc warehouses" htmlFor="warehouses" />
                </div>
                <p>{getLandType('WAREHOUSES')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'KIOSKS' ? true : false}
                    id="kiosks"
                    type="radio"
                    name="land-type"
                    value="KIOSKS"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc kiosks" htmlFor="kiosks" />
                </div>
                <p>{getLandType('KIOSKS')}</p>
              </div>
            </AntdCol>
            <AntdCol span={4} style={{ alignItems: 'center' }}>
              <div className="image-block">
                <div className="image-item">
                  <input
                    checked={(this.state.landType || this.props.house.landType) === 'MOTEL_ROOM' ? true : false}
                    id="motel-room"
                    type="radio"
                    name="land-type"
                    value="MOTEL_ROOM"
                    onClick={this.onChangeItemLandType}
                  />
                  <label className="drinkcard-cc motel-room" htmlFor="motel-room" />
                </div>
                <p>{getLandType('MOTEL_ROOM')}</p>
              </div>
            </AntdCol>
          </AntdRow>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
