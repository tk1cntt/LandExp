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
            <h5 style={{ color: 'red' }}>Bạn muốn bán hay cho thuê bất động sản?</h5>
          </AntdRow>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <AntdRow className="cc-selector" type="flex" justify="center" align="middle">
              <AntdCol span={6} style={{ alignItems: 'center' }}>
                <div className="image-block">
                  <div className="image-big-item">
                    <input
                      checked={(this.state.actionType || this.props.house.actionType) === 'FOR_SELL' ? true : false}
                      id="sale"
                      type="radio"
                      name="action-type"
                      value="FOR_SELL"
                      onClick={this.onChangeItemActionType}
                    />
                    <label className="drinkcard-cc sale" htmlFor="sale" />
                  </div>
                  <p>{getActionType('FOR_SELL')}</p>
                </div>
              </AntdCol>
              <AntdCol span={6} style={{ alignItems: 'center' }}>
                <div className="image-block">
                  <div className="image-big-item">
                    <input
                      checked={(this.state.actionType || this.props.house.actionType) === 'FOR_RENT' ? true : false}
                      id="rent"
                      type="radio"
                      name="action-type"
                      value="FOR_RENT"
                      onClick={this.onChangeItemActionType}
                    />
                    <label className="drinkcard-cc sale" htmlFor="rent" />
                  </div>
                  <p>{getActionType('FOR_RENT')}</p>
                </div>
              </AntdCol>
            </AntdRow>
          </div>
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
