import './home.css';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Flex, Card, Drawer, SearchBar, List, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';

import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getMoney, encodeId } from 'app/shared/util/utils';
import { getSession } from 'app/shared/reducers/authentication';
import { getTopEntities } from 'app/entities/house/house.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import SideBar from 'app/shared/layout/menu/sidebar';

export interface IHomeProp extends StateProps, DispatchProps { }

export interface IHomeState {
  open: any;
}

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    open: false
  };

  componentDidMount() {
    this.props.getTopEntities();
  }

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }

  onSearch = value => {
    // console.log(value);
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <NavBar icon={<Icon type="bars" />} onLeftClick={this.onOpenChange}>
          <Link to={'/'}><img src="/content/images/logo.png" /></Link>
        </NavBar>
        <SearchBar
          placeholder="Tìm kiếm thông tin nhà đất"
          onCancel={this.onSearch}
          cancelText={'Tìm'} />
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 10 }}
          sidebar={<SideBar />}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="flex-container">
            {this.props.houseList.map((house, i) => (
              <div key={`entity-${i}`}>
                <Flex>
                  <Flex.Item>
                    <Card>
                      <Card.Header
                        title={`${house.districtType} ${house.districtName}, ${house.cityName}`}
                      />
                      <Card.Body>
                        <Link to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}>
                          <div className="item-display">
                            <img src="/content/images/item-1.png" />
                            <div className="item-info">
                              <div className="title">{getLandType(house.landType)}</div>
                              <div className="price" dangerouslySetInnerHTML={{ __html: getMoney(house.money, house.actionType) }} />
                              <div className="property">
                                <span className="compact">{house.acreage}m2</span>
                                <span className="bedroom">{house.bedRoom}</span>
                                <span className="bathroom">{house.bathRoom}</span>
                                <span className="gara">{house.parking ? <i className="fa fa-check" /> : <i className="fa fa-times" />}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="md" />
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  houseList: storeState.house.entities,
  loading: storeState.house.loading
});

const mapDispatchToProps = { getTopEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
