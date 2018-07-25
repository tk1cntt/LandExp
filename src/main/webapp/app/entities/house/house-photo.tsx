import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, Cascader } from 'antd';
const FormItem = Form.Item;

import { getEntity, updateEntity, createEntity, setBlob, reset } from './house.reducer';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';
import { deleteEntity } from 'app/entities/house-photo/house-photo.reducer';

export interface IHousePhotoUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHousePhotoUpdateState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any;
}

export class HousePhotoUpdate extends React.Component<IHousePhotoUpdateProps, IHousePhotoUpdateState> {
  state: IHousePhotoUpdateState = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  componentDidMount() {
    this.props.housePhotoList.map(photo => {
      this.state.fileList.push({
        uid: photo.id,
        photoId: photo.id,
        thumbUrl: 'data:image/jpeg;base64,' + photo.image,
        type: photo.imageContentType
      });
      this.props.updateHouse({ fileList: this.state.fileList });
    });
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

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
    const { houseEntity } = this.props;
    const { avatar, avatarContentType } = houseEntity;
    return (
      <>
        <Col md="12">
          <Label id="avatarLabel" for="avatar">
            <Translate contentKey="landexpApp.house.avatar">Avatar</Translate>
          </Label>
          <br />
          {avatar ? (
            <div>
              <a onClick={openFile(avatarContentType, avatar)}>
                <img src={`data:${avatarContentType};base64,${avatar}`} style={{ maxHeight: '100px' }} />
              </a>
              <br />
              <Row>
                <Col md="11">
                  <span>
                    {avatarContentType}, {byteSize(avatar)}
                  </span>
                </Col>
                <Col md="1">
                  <Button color="danger" onClick={this.clearBlob('avatar')}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </Col>
              </Row>
            </div>
          ) : null}
          <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
        </Col>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { setBlob, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousePhotoUpdate);
