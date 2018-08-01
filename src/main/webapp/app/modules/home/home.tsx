import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { WingBlank, WhiteSpace, Badge, Button } from 'antd-mobile';

import { IRootState } from 'app/shared/reducers';

export interface IHomeProp extends StateProps, DispatchProps {}

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

export class Home extends React.Component<IHomeProp> {
  render() {
    return (
      <WingBlank>
        <WhiteSpace size="lg" />
        <Button type="primary">
            Ant design mobile web entry
            <Badge text="new" />
        </Button>
      </WingBlank>
    );
  }
}

const mapStateToProps = storeState => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
