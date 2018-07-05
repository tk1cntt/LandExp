import './home.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate, TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getMoney } from 'app/shared/util/utils';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHomeProp extends StateProps, DispatchProps {
  houses: any;
}

export class HomeGrid extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  itemInfo(house) {
    return (
      <div className="col-md-3 post-item">
        <div className="item-thumbnail">
          <a href="#">
            <img src="/static/upload/products/item-1.png" />
          </a>
          {house.actionType === 'FOR_SELL' ? (
            <div className="type sell">{getActionType(house.actionType)}</div>
          ) : (
            <div className="type hire">{getActionType(house.actionType)}</div>
          )}
          <a href="#" className="like-button">
            <i className="fa fa-heart-o" />
          </a>
        </div>
        <a href="#" className="like-button" />
        <div className="item-info">
          <a href="#" className="like-button" />
          <a href="#">
            <h3 className="title">{getLandType(house.landType)}</h3>
          </a>
          <p className="subtitle">Dự án Vinhome D’Capital</p>
          <p className="price">{getMoney(house.money, house.actionType)}</p>
          <div className="post-date">
            Ngày đăng{' '}
            <span>
              <TextFormat type="date" value={house.createAt} format={APP_LOCAL_DATE_FORMAT} />
            </span>
          </div>
          <div className="property">
            <span className="compact">{house.acreage}m2</span>
            <span className="bedroom">{house.bedRoom}</span>
            <span className="bathroom">{house.bathRoom}</span>
            <span className="gara">{house.parking ? <i className="fa fa-check" /> : <i className="fa fa-uncheck" />}</span>
          </div>
          <p className="location">
            {house.districtName}, {house.cityName}
          </p>
        </div>
        <div className="clearfix" />
      </div>
    );
  }

  render() {
    const { account } = this.props;
    return (
      <div role="tabpanel" className="tab-pane active" id="grid">
        <div className="gridview">
          {this.props.houses.map(house => {
            this.itemInfo(house);
          })}
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type ban">BÁN</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>4,5</span> tỷ
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type chothue">CHO THUÊ</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>5</span> triệu/tháng
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type ban">BÁN</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>4,5</span> tỷ
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type chothue">CHO THUÊ</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>5</span> triệu/tháng
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type ban">BÁN</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>4,5</span> tỷ
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type chothue">CHO THUÊ</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>5</span> triệu/tháng
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type ban">BÁN</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>4,5</span> tỷ
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type chothue">CHO THUÊ</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>5</span> triệu/tháng
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type ban">BÁN</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>4,5</span> tỷ
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type chothue">CHO THUÊ</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>5</span> triệu/tháng
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col-md-3 post-item">
            <div className="item-thumbnail">
              <a href="#">
                <img src="/static/upload/products/item-1.png" />
              </a>
              <div className="type ban">BÁN</div>
              <a href="#" className="like-button">
                <i className="fa fa-heart-o" />
              </a>
            </div>
            <a href="#" className="like-button" />
            <div className="item-info">
              <a href="#" className="like-button" />
              <a href="#">
                <h3 className="title">Căn hộ chung cư</h3>
              </a>
              <p className="subtitle">Dự án Vinhome D’Capital</p>
              <p className="price">
                <span>4,5</span> tỷ
              </p>
              <div className="post-date">
                Ngày đăng <span>31/5/2018</span>
              </div>
              <div className="property">
                <span className="compact">60m2</span>
                <span className="bedroom">2</span>
                <span className="bathroom">1</span>
                <span className="gara">
                  <i className="fa fa-check" />
                </span>
              </div>
              <p className="location">Quận Đống Đa, Hà Nội</p>
            </div>
            <div className="clearfix" />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeGrid);
