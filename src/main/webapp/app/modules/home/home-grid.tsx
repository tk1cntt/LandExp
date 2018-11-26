import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate, TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'antd';
import { getSession } from 'app/shared/reducers/authentication';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getMoney, encodeId } from 'app/shared/util/utils';
import { SERVER_API_URL, APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHomeProp extends StateProps, DispatchProps {
  houses: any;
}

export class HomeGrid extends React.Component<IHomeProp> {
  houseDetail(house, i) {
    const thumbnail = `${SERVER_API_URL}/api/house-photos/${encodeId(house.id)}/thumbnails.jpg`;
    return (
      <Col key={`entity-${i}`} sm={12} md={8} lg={6}>
        <Col className="house-item">
          <div className="item-thumbnail">
            <Link to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}>
              <img src={thumbnail} />
            </Link>
            {house.actionType === 'FOR_SELL' ? <div className="type ban">BÁN</div> : <div className="type chothue">CHO THUÊ</div>}
            <a href="#" className="like-button">
              <i className="fa fa-heart-o" />
            </a>
          </div>
          <div className="item-info">
            <h3 className="title">
              <Link to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}>{getLandType(house.landType)}</Link>
            </h3>
            <p className="subtitle">{house.projectName}</p>
            <div className="price-container">
              <p className="price" dangerouslySetInnerHTML={{ __html: getMoney(house.money, house.actionType) }} />
              <div className="post-date">
                Ngày đăng{' '}
                <span>
                  <TextFormat type="date" value={house.createAt} format={APP_LOCAL_DATE_FORMAT} />
                </span>
              </div>
            </div>
            <ul className="property">
              <li>
                <img src="/static/images/icon/ic_view_compact.png" /> {house.acreage}m2
              </li>
              <li>
                <img src="/static/images/icon/ic_hotel.png" /> {house.bedRoom}
              </li>
              <li>
                <img src="/static/images/icon/bathtub.png" /> {house.bathRoom}
              </li>
              <li>
                <img src="/static/images/icon/ic_directions_car.png" />{' '}
                {house.parking ? <i className="fa fa-check" /> : <i className="fa fa-times" />}
              </li>
            </ul>
          </div>
          <div className="location">
            <p>
              {house.districtType} {house.districtName}, {house.cityName}
            </p>
          </div>
        </Col>
      </Col>
    );
  }

  render() {
    return (
      <div role="tabpanel" className="tab-pane active" id="grid">
        <Row className="gridview" gutter={16}>
          {this.props.houses.map((house, i) => this.houseDetail(house, i))}
        </Row>
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
)(HomeGrid);
