import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Upload, Icon, Modal, Carousel, Spin } from 'antd';

import { SERVER_API_URL } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { deleteEntity } from 'app/entities/house-photo/house-photo.reducer';
import { encodeId } from 'app/shared/util/utils';

export interface IStepFourProp extends StateProps, DispatchProps {
  updateHouse: Function;
  house: any;
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
    const fileList = [];
    this.props.housePhotoList.map(photo => {
      const thumbUrl = `${SERVER_API_URL}/api/house-photos/${encodeId(photo.id)}/contents/${this.props.house.link}-${encodeId(
        photo.id
      )}.jpg`;
      fileList.push({
        uid: photo.id,
        photoId: photo.id,
        thumbUrl
        // thumbUrl: 'data:image/jpeg;base64,' + photo.image,
        // type: photo.imageContentType
      });
    });
    this.setState({ fileList });
    this.props.updateHouse({ fileList });
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false
    });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleRemove = file => {
    if (file.photoId) {
      this.props.deleteEntity(file.photoId);
    }
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.props.updateHouse({ fileList });
  };

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
        slides.push(<img key={file.uid} style={{ width: '400px', height: '200px' }} src={file.thumbUrl} />);
      });
    }
    return (
      <div className="clearfix" style={{ padding: 20 }}>
        <Spin spinning={this.props.loading} tip="Đang cập nhật dữ liệu...">
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
          >
            {fileList.length >= 6 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  housePhotoList: storeState.housePhoto.entities,
  loading: storeState.housePhoto.loading
});

const mapDispatchToProps = { getSession, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepFour);
