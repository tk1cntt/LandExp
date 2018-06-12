import './post.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { Steps, Button, message } from 'antd';
const Step = Steps.Step;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import StepSix from './stepTwo';
import StepSeven from './stepOne';

import './antd.min.css';

const steps = [
  {
    title: 'Hình thức',
    content: <StepOne />
  },
  {
    title: 'Vị trí',
    content: <StepTwo />
  },
  {
    title: 'Đặc điểm',
    content: <StepThree />
  },
  {
    title: 'Giá',
    content: <StepFour />
  },
  {
    title: 'Liên hệ',
    content: <StepFive />
  },
  {
    title: 'Xác nhận',
    content: <StepSix />
  },
  {
    title: 'Thanh toán',
    content: <StepSeven />
  }
];

export interface IPostProp extends StateProps, DispatchProps {}

export interface IPostState {
  current: any;
}

export class PostPage extends React.Component<IPostProp, IPostState> {
  state: IPostState = {
    current: 0
  };
  componentDidMount() {
    this.props.getSession();
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <Row>
        <Col md="12">
          <Steps size="small" current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </Col>
        <Col md="8" className="pad">
          <div>
            <div className="steps-content">{steps[this.state.current].content}</div>
            <div className="steps-action" style={{ marginTop: 16 }}>
              {this.state.current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
              {this.state.current > 0 && <Button onClick={() => this.prev()}>Previous</Button>}
              {this.state.current < steps.length - 1 && (
                <Button style={{ marginLeft: 8 }} type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </Col>
        <Col md="4" className="pad">
          Main step
        </Col>
      </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
