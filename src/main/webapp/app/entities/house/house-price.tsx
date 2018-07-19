import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { Form, Input, Cascader } from 'antd';
const FormItem = Form.Item;

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';

export interface IHousePriceUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHousePriceUpdateState {
  money: any;
}

export class HousePriceUpdate extends React.Component<IHousePriceUpdateProps, IHousePriceUpdateState> {
  state: IHousePriceUpdateState = {
    money: null
  };

  onChangeAddress = e => {
    this.setState({
      money: e.target.value
    });
    this.props.updateHouse({
      money: e.target.value
    });
  };

  updateMarkerPosition = position => {};

  render() {
    const { houseEntity } = this.props;
    return (
      <>
        <Col md="6">
          <AvGroup>
            <Label id="moneyLabel" for="money">
              <Translate contentKey="landexpApp.house.money">Money</Translate>
            </Label>
            <AvField id="house-money" type="number" className="form-control" name="money" />
          </AvGroup>
        </Col>
        <Col md="6">
          <AvGroup>
            <Label id="discountLabel" for="discount">
              <Translate contentKey="landexpApp.house.discount">Discount</Translate>
            </Label>
            <AvField id="house-discount" type="number" className="form-control" name="discount" />
          </AvGroup>
        </Col>
        <Col md="6">
          <AvGroup>
            <Label id="saleTypeLabel">
              <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate>
            </Label>
            <AvInput
              id="house-saleType"
              type="select"
              className="form-control"
              name="saleType"
              value={houseEntity.saleType || 'SALE_BY_MYSELF'}
            >
              <option value="SALE_BY_MYSELF">{getSaleType('SALE_BY_MYSELF')}</option>
              <option value="SALE_BY_MYSELF_VIP">{getSaleType('SALE_BY_MYSELF_VIP')}</option>
              <option value="SALE_SUPPORT">{getSaleType('SALE_SUPPORT')}</option>
              <option value="SALE_SUPPORT_VIP">{getSaleType('SALE_SUPPORT_VIP')}</option>
            </AvInput>
          </AvGroup>
        </Col>
        <Col md="6">
          <AvGroup>
            <Label id="presentLabel">
              <Translate contentKey="landexpApp.house.present">Present</Translate>
            </Label>
            <AvInput id="house-present" type="select" className="form-control" name="present" value={houseEntity.present || 'NONE'}>
              <option value="NONE">{getPresent('NONE')}</option>
              <option value="BASIC_FURNITURE">{getPresent('BASIC_FURNITURE')}</option>
              <option value="FULL_FURNITURE">{getPresent('FULL_FURNITURE')}</option>
              <option value="DISCOUNT_PRICE">{getPresent('DISCOUNT_PRICE')}</option>
              <option value="SUPPORT_EXHIBIT">{getPresent('SUPPORT_EXHIBIT')}</option>
              <option value="SUPPORT_FEE">{getPresent('SUPPORT_FEE')}</option>
              <option value="HAVE_PRESENT">{getPresent('HAVE_PRESENT')}</option>
            </AvInput>
          </AvGroup>
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
)(HousePriceUpdate);
