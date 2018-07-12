import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate, TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getLandType, getMoney, formatDate } from 'app/shared/util/utils';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SearchPage from 'app/shared/layout/search/search-menu';
import HouseDetail from './home-detail';

export interface IHomeProp extends StateProps, DispatchProps {
  houses: any;
}

export interface IHouseState {
  itemActive: any;
}

export class HomeList extends React.Component<IHomeProp, IHouseState> {
  state: IHouseState = {
    itemActive: 0
  };

  componentDidMount() {
    // this.props.getSession();
  }

  itemInfoClick = house => {
    this.setState({
      itemActive: house.id
    });
  };

  render() {
    const { account } = this.props;
    return (
      <div role="tabpanel" className="tab-pane" id="list">
        <div className="listview-left">
          {this.props.houses.map((house, i) => (
            <div
              key={`entity-${i}`}
              className={`post-item ${this.state.itemActive === house.id ? 'active' : ''}`}
              onClick={this.itemInfoClick.bind(this, house)}
            >
              <div className="item-thumbnail">
                <a href="#">
                  <img src="/static/upload/products/item-1.png" />
                </a>
                {house.actionType === 'FOR_SELL' ? <div className="type ban">BÁN</div> : <div className="type chothue">CHO THUÊ</div>}
              </div>
              <div className="item-info">
                <a href="#">
                  <h3 className="title">{getLandType(house.landType)}</h3>
                </a>
                <p className="subtitle">Dự án Vinhome D’Capital</p>
                <p className="price" dangerouslySetInnerHTML={{ __html: getMoney(house.money, house.actionType) }} />
                <div className="property">
                  <span className="compact">{house.acreage}m2</span>
                  <span className="bedroom">{house.bedRoom}</span>
                  <span className="bathroom">{house.bathRoom}</span>
                  <span className="gara">{house.parking ? <i className="fa fa-check" /> : <i className="fa fa-times" />}</span>
                </div>
                <p className="location">
                  {house.districtName}, {house.cityName}
                </p>
                <div className="button-group">
                  <p className="post-date">{formatDate(new Date(house.createAt))}</p>
                  <span className="favorite">
                    <a href="#">
                      <i className="fa fa-heart-o" />
                    </a>
                  </span>
                  <span className="contact">
                    <a href="#">Liên hệ</a>
                  </span>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          ))}
        </div>
        <div className="listview-right">
          <div className="page-info">
            <p className="text-center">
              Lựa chọn Bất động sản phù hợp với nhu cầu của bạn hoặc liên hệ với chúng tôi để được tư vấn mua / thuê Bất động sản tốt nhất
            </p>
            <h3 className="text-center">0941 968383 - Chuyên gia tư vấn</h3>
          </div>
          <HouseDetail />
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeList);
