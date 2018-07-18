import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import { Select, Input, Card } from 'antd';
const Option = Select.Option;

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';

import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './article.reducer';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IArticleUpdateState {
  isNew: boolean;
  categoryId: number;
  createById: number;
  updateById: number;
  title: any;
  summary: any;
  content: any;
  statusType: any;
}

export class ArticleUpdate extends React.Component<IArticleUpdateProps, IArticleUpdateState> {
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
      createById: 0,
      updateById: 0,
      title: null,
      summary: null,
      content: null,
      statusType: null,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCategories();
    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = () => {
    const { articleEntity } = this.props;
    const entity = {
      ...articleEntity,
      summary: this.state.summary,
      content: this.state.content
    };
    /*
    console.log(entity);
    if (this.state.isNew) {
      this.props.createEntity(entity);
    } else {
      this.props.updateEntity(entity);
    }
    this.handleClose();
    */
  };

  handleClose = () => {
    this.props.history.push('/quan-ly/tin-tuc');
  };

  categoryUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        categoryId: -1
      });
    } else {
      for (const i in this.props.categories) {
        if (name === this.props.categories[i].name.toString()) {
          this.setState({
            categoryId: this.props.categories[i].id
          });
        }
      }
    }
  };

  createByUpdate = element => {
    const login = element.target.value.toString();
    if (login === '') {
      this.setState({
        createById: -1
      });
    } else {
      for (const i in this.props.users) {
        if (login === this.props.users[i].login.toString()) {
          this.setState({
            createById: this.props.users[i].id
          });
        }
      }
    }
  };

  updateByUpdate = element => {
    const login = element.target.value.toString();
    if (login === '') {
      this.setState({
        updateById: -1
      });
    } else {
      for (const i in this.props.users) {
        if (login === this.props.users[i].login.toString()) {
          this.setState({
            updateById: this.props.users[i].id
          });
        }
      }
    }
  };

  onChangeTitle = value => {
    this.setState({
      title: value
    });
  };

  onChangeSummary = value => {
    this.setState({
      summary: value
    });
  };

  onChangeContent = value => {
    this.setState({
      content: value
    });
  };

  onChangeStatusType = value => {
    this.setState({
      statusType: value
    });
  };

  render() {
    const isInvalid = false;
    const { articleEntity, categories, users, loading, updating } = this.props;
    const { isNew } = this.state;
    const { avatar, avatarContentType } = articleEntity;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              <Row>
                {this.props.loading ? (
                  <Loading />
                ) : (
                  <Card title="Cập nhật tin tức">
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <Label id="avatarLabel" for="avatar">
                        <Translate contentKey="landexpApp.article.avatar">Avatar</Translate>
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
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <Input
                        addonBefore="Tiêu đề bản tin"
                        defaultValue={this.state.title || this.props.articleEntity.title}
                        onChange={this.onChangeTitle}
                      />
                    </Col>
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <Label id="summaryLabel" for="summary">
                        <Translate contentKey="landexpApp.article.summary">Summary</Translate>
                      </Label>
                      <ReactQuill defaultValue={this.state.summary} onChange={this.onChangeSummary} placeholder="Tóm tắt bản tin" />
                    </Col>
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <Label id="contentLabel" for="content">
                        <Translate contentKey="landexpApp.article.content">Content</Translate>
                      </Label>
                      <ReactQuill
                        defaultValue={this.state.content}
                        theme="snow"
                        modules={this.modules}
                        formats={this.formats}
                        onChange={this.onChangeContent}
                        placeholder="Chi tiết bản tin"
                      />
                    </Col>
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <Select
                        style={{ width: '100%' }}
                        value={this.state.statusType || 'OPEN'}
                        placeholder="Trạng thái tin"
                        onChange={this.onChangeStatusType}
                      >
                        <Option value="OPEN">Chờ xét duyệt</Option>
                        <Option value="PAID">Hiển thị</Option>
                      </Select>
                    </Col>
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <Select
                        style={{ width: '100%' }}
                        value={this.state.statusType}
                        placeholder="Danh mục tin tức"
                        onChange={this.onChangeStatusType}
                      >
                        {categories
                          ? categories.map(otherEntity => (
                              <Option value={otherEntity.id} key={otherEntity.id}>
                                {otherEntity.name}
                              </Option>
                            ))
                          : null}
                      </Select>
                    </Col>
                    <Col md="12">
                      <Button tag={Link} id="cancel-save" to="/quan-ly/tin-tuc" replace color="info">
                        <FontAwesomeIcon icon="arrow-left" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.back">Back</Translate>
                        </span>
                      </Button>{' '}
                      <Button color="primary" id="save-entity" disabled={isInvalid || updating} onClick={this.saveEntity}>
                        <FontAwesomeIcon icon="save" /> <Translate contentKey="entity.action.save">Save</Translate>
                      </Button>
                    </Col>
                  </Card>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  users: storeState.userManagement.users,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating
});

const mapDispatchToProps = {
  getCategories,
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleUpdate);
