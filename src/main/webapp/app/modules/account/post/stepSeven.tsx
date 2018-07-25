import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Upload, Icon, Modal } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepSevenProp extends StateProps, DispatchProps {}

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

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { account } = this.props;
    return (
      <div className="clearfix" style={{ margin: 30 }}>
        <h3 className="text-center">
          <strong>Hoàn tất đăng tin</strong>
        </h3>
        <p>Bạn đã hoàn tất việc cung cấp thông tin đăng bán bất động sản trên website của chúng tôi.</p>
        <p>
          <i>Bạn vui lòng kiểm tra lại thông tin đăng bán ở cột bên phải.</i>
        </p>
        <p>
          Bạn sẽ cần thanh toán khoản phí đăng tin 1 lần duy nhất, tin đăng của bạn sẽ được hiển thị trên website ngay. Chúng tôi sẽ bắt đầu
          hỗ trợ bán bất động sản của bạn bằng giải pháp tốt nhất và nhanh chóng nhất.
        </p>
        <p>
          Hãy chờ tin của chúng tôi!<br />Cảm ơn bạn đã tin tưởng.
        </p>
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
)(StepSeven);
