import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Form, Input, Cascader } from 'antd';
const FormItem = Form.Item;

import { getSession } from 'app/shared/reducers/authentication';

import { getPaymentOfHouse } from 'app/entities/payment/payment.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';

export interface IStepTwoProp extends StateProps, DispatchProps {
  updateHouse: Function;
  house: any;
}

export interface IStepOneState {
  city: any;
  address: any;
  locations: any;
}

export class StepTwo extends React.Component<IStepTwoProp, IStepOneState> {
  state: IStepOneState = {
    city: null,
    address: null,
    locations: []
  };

  componentDidMount() {
    this.props.getPaymentOfHouse(this.props.house.id);
    this.props.getImageOfHouse(this.props.house.id);
    const locations = this.state.locations;
    this.props.cities.map(city => {
      const cityData = {
        value: city.id,
        label: city.name,
        children: []
      };
      city.districts.map(district => {
        const districtData = {
          value: district.id,
          label: district.type + ' ' + district.name,
          children: []
        };
        district.wards.map(ward => {
          const wardData = {
            value: ward.id,
            label: ward.type + ' ' + ward.name
          };
          districtData.children.push(wardData);
        });
        cityData.children.push(districtData);
      });
      locations.push(cityData);
    });
    this.setState({
      locations
    });
  }

  onChangeCascader = value => {
    this.setState({
      city: value
    });
    this.props.updateHouse({
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    });
  };

  onChangeAddress = e => {
    this.setState({
      address: e.target.value
    });
    this.props.updateHouse({
      address: e.target.value
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      }
    };

    const defaultValue = [this.props.house.cityId, this.props.house.districtId, this.props.house.wardId];

    return (
      <Row>
        <h3 className="text-center">
          <strong>Vị trí bất động sản của bạn?</strong>
        </h3>
        <Col md="12">
          <Form>
            <FormItem {...formItemLayout} label="Thành phố">
              <Cascader
                defaultValue={this.state.city || defaultValue}
                options={this.state.locations}
                onChange={this.onChangeCascader}
                placeholder="Chọn thành phố"
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Địa chỉ chi tiết">
              <Input
                placeholder="Số nhà, ngõ, ngách, phố"
                value={this.state.address || this.props.house.address}
                onChange={this.onChangeAddress}
              />
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities
});

const mapDispatchToProps = { getSession, getPaymentOfHouse, getImageOfHouse };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepTwo);
