import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Upload, Icon, Modal } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

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
    this.setState({ fileList });
    const images = [];
    /*
    for (var i = 0, len = fileList.length; i < len; i++) {
      console.log(fileList[i]);
      console.log(fileList[i].type);
      // console.log(fileList[i].thumbUrl);
      let imageURL = fileList[i].thumbUrl;
      // console.log(imageURL);
      let block = imageURL.split(";");
      // console.log(block);
      let realData = block[1].split(",")[1];
      // console.log(realData);
      images.push({ image: realData, imageContentType: fileList[i].type, houseId: this.props.house.id });
    }
    */
    fileList.forEach(file => {
      console.log(file);
      console.log(file['type']);
      console.log(file['thumbUrl']);
      let imageURL = file.thumbUrl;
      // console.log(imageURL);
      let block = imageURL.split(";");
      // console.log(block);
      let realData = block[1].split(",")[1];
      // console.log(realData);
      images.push({ image: realData, imageContentType: file.type, houseId: this.props.house.id });
    });
    this.props.updateHouse({ images });
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
  house: storeState.house.entity
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
