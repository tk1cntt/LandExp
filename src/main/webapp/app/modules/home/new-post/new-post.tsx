import './new-post.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import News from './news/news';
import DetailNews from './detail-news/detail-news';

import { getSession } from 'app/shared/reducers/authentication';

import NewTitle from './new-title/new-title';

export interface IHomeProp extends StateProps, DispatchProps {}

export class NewPost extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  state = {
    distance: 15,
    roundNumber: 100,
    data: [
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '4.5',
        unit: 'tỷ',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'BÁN',
        sell: true,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '15',
        unit: 'triệu',
        acreage: '120m2',
        bedroom: 3,
        bathroom: 3,
        action: 'THUÊ',
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '4.5',
        unit: 'tỷ',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'BÁN',
        sell: true,
        garage: false,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '4.5',
        unit: 'tỷ',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'BÁN',
        sell: true,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '12',
        unit: 'triệu/tháng',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'CHO THUÊ',
        sell: false,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '4.5',
        unit: 'tỷ',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'BÁN',
        cell: true,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '4.5',
        unit: 'tỷ',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'BÁN',
        sell: true,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Căn hộ chung cư',
        project: 'Dự án Vinhome D’Capital',
        price: '5',
        unit: 'tỷ',
        acreage: '80m2',
        bedroom: 2,
        bathroom: 2,
        action: 'BÁN',
        cell: true,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      },
      {
        img: 'static/images/6.png',
        title: 'Biệt thự liền kề',
        project: 'Dự án Vinhome D’Capital',
        price: '12',
        unit: 'tỷ',
        acreage: '200m2',
        bedroom: 4,
        bathroom: 5,
        action: 'BÁN',
        sell: true,
        garage: true,
        location: 'Quận Đống Đa, Hà Nội',
        postDate: '31/05/2017'
      }
    ],
    widthOfParent: 0,
    widthOfSmallElement: 0,
    heightOfSmallElement: 0,
    widthOfBigElement: 0,
    heightOfBigElement: 0,
    heightBoundary: 0
  };

  render() {
    return (
      <div id="new-post" className="lastest-posts">
        <NewTitle />
        <Row>
          <Col sm="6">
            <News data={this.state.data} />
          </Col>
          <Col sm="6">
            <DetailNews />
          </Col>
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
)(NewPost);
