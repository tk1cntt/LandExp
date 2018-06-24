import './detail-news.css';

import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { Carousel as Album } from 'react-responsive-carousel';
import { getSession } from 'app/shared/reducers/authentication';

export interface IDetailProp extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {}

export interface IDetailState {}

export class DetailNews extends React.Component<IDetailProp, IDetailState> {
  render() {
    const slides = [];
    if (this.props.housePhotoList) {
      this.props.housePhotoList.map(file => {
        slides.push(<img key={file.id} className="center-cropped" src={`data:image/jpeg;base64,${file.image}`} />);
      });
    }
    return (
      <Col md="6">
        <div className="justify-content-center" style={{ border: '1px solid #dfdfdf' }}>
          <Album showArrows={true} showThumbs={false} autoPlay={true}>{slides}</Album>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = storeState => ({
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailNews);
