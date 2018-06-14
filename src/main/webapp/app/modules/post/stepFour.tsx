import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Upload, Icon, Modal } from 'antd';

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
    console.log(this.props.housePhotoList);
    this.props.housePhotoList.map(photo => {
      this.state.fileList.push({
        uid: photo.id,
        photoId: photo.id,
        thumbUrl: 'data:image/jpeg;base64,' + photo.image,
        type: photo.imageContentType
      })
    })
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

  handleChange = ({ fileList }) => {
    const oldFiles = this.state.fileList;
    let difference = oldFiles.filter(x => !fileList.includes(x));
    if (difference) {
      difference.map(file => {
        if (file.photoId) {
          this.props.deleteEntity(file.photoId);
        }
      })
    }
    this.setState({ fileList });
    this.props.updateHouse({ fileList });
  }

  render() {
    const { account } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix" style={{ margin: 30 }}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
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
