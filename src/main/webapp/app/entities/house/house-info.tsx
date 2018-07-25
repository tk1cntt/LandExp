import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { Form, Input, Cascader } from 'antd';
const FormItem = Form.Item;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';

export interface IHouseInfoUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHouseInfoUpdateState {
  customer: any;
  mobile: any;
  email: any;
  zalo: any;
  facebook: any;
}

export class HouseInfoUpdate extends React.Component<IHouseInfoUpdateProps, IHouseInfoUpdateState> {
  state: IHouseInfoUpdateState = {
    customer: undefined,
    mobile: undefined,
    email: undefined,
    zalo: undefined,
    facebook: undefined
  };

  onChangeCustomer = e => {
    this.setState({
      customer: e.target.value
    });
    this.props.updateHouse({
      customer: e.target.value
    });
  };

  onChangeMobile = e => {
    this.setState({
      mobile: e.target.value
    });
    this.props.updateHouse({
      mobile: e.target.value
    });
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
    this.props.updateHouse({
      email: e.target.value
    });
  };

  onChangeZalo = e => {
    this.setState({
      zalo: e.target.value
    });
    this.props.updateHouse({
      zalo: e.target.value
    });
  };

  onChangeFacebook = e => {
    this.setState({
      facebook: e.target.value
    });
    this.props.updateHouse({
      facebook: e.target.value
    });
  };

  render() {
    const { houseEntity } = this.props;
    return (
      <>
        <Col md="6">
          <Label id="customerLabel" for="customer">
            <Translate contentKey="landexpApp.house.customer">Customer</Translate>
          </Label>
          <Input defaultValue={houseEntity.customer} onChange={this.onChangeCustomer} />
        </Col>
        <Col md="6">
          <Label id="mobileLabel" for="mobile">
            <Translate contentKey="landexpApp.house.mobile">Mobile</Translate>
          </Label>
          <AvField id="house-mobile" type="text" name="mobile" />
          <Input defaultValue={houseEntity.mobile} type="number" onChange={this.onChangeMobile} />
        </Col>
        <Col md="6">
          <Label id="emailLabel" for="email">
            <Translate contentKey="landexpApp.house.email">Email</Translate>
          </Label>
          <AvField id="house-email" type="text" name="email" />
          <Input defaultValue={houseEntity.email} onChange={this.onChangeEmail} />
        </Col>
        <Col md="6">
          <Label id="facebookLabel" for="facebook">
            <Translate contentKey="landexpApp.house.facebook">Facebook</Translate>
          </Label>
          <AvField id="house-facebook" type="text" name="facebook" />
          <Input defaultValue={houseEntity.facebook} onChange={this.onChangeFacebook} />
        </Col>
        <Col md="6">
          <Label id="zaloLabel" for="zalo">
            <Translate contentKey="landexpApp.house.zalo">Zalo</Translate>
          </Label>
          <AvField id="house-zalo" type="text" name="zalo" />
          <Input defaultValue={houseEntity.zalo} onChange={this.onChangeZalo} />
        </Col>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseInfoUpdate);
