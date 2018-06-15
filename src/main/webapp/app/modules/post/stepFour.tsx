import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Upload, Icon, Modal, Carousel } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { deleteEntity } from '../../entities/house-photo/house-photo.reducer';

export interface IStepFourProp extends StateProps, DispatchProps {
  updateHouse;
}

export interface IStepFourState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any;
}

export class StepFour extends React.Component<IStepFourProp, IStepFourState> {
  state: IStepFourState = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  componentDidMount() {
    this.props.getSession();
    this.props.housePhotoList.map(photo => {
      this.state.fileList.push({
        uid: photo.id,
        photoId: photo.id,
        thumbUrl: 'data:image/jpeg;base64,' + photo.image,
        type: photo.imageContentType
      });
    });
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false
    });
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  handleRemove = file => {
    if (file.photoId) {
      this.props.deleteEntity(file.photoId);
    }
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.props.updateHouse({ fileList });
  }

  render() {
    const { account } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Chọn hình ảnh giới thiệu nhà của bạn</div>
      </div>
    );
    const slides = [];
    if (fileList) {
      fileList.map(file => {
        slides.push(
          <img style={{ width: '600px', height: '400px' }} src={file.thumbUrl} />
        );
      });
    }
    return (
      <div className="clearfix" style={{ padding: 20 }}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Col md="12">
          <div style={{ marginTop: 30 }}>
            <Carousel autoplay>
              {slides}
            </Carousel>
          </div>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  house: storeState.house.entity,
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { getSession, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
