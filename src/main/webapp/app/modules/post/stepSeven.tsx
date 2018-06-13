import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Upload, Icon, Modal } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepSevenProp extends StateProps, DispatchProps { }

export interface IStepSevenState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any;
}

export class StepSeven extends React.Component<IStepSevenProp, IStepSevenState> {
  state: IStepSevenState = {
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

  handleChange = ({ fileList }) => this.setState({ fileList });

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
          action="/api/houses-images/123456789"
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
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepSeven);
