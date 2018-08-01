import './home.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IPaginationBaseState, getSortState } from 'react-jhipster';
import { connect } from 'react-redux';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { Button } from 'antd-mobile-web'
import Badge from 'antd-mobile-web/lib/badge'

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export interface IHomeState extends IPaginationBaseState { }

const repo = 'https://github.com/cncolder/antd-mobile-web'

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  render() {
    return (
      <Button
        type='primary'
        onClick={() => location.href = repo}>
        Ant design mobile web entry
          <Badge text='new' />
      </Button>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
