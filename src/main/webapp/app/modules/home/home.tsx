import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer, SearchBar, List, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { Icon } from 'antd';

class Home extends React.Component {
  state = {
    open: false
  };

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }

  onSearch = value => {
    // console.log(value);
  }

  render() {
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    return (
      <div style={{ height: '100%' }}>
        <NavBar icon={<Icon type="bars" />} onLeftClick={this.onOpenChange}>
          <img src="/content/images/logo.png" />
        </NavBar>
        <SearchBar
          placeholder="Tìm kiếm thông tin nhà đất"
          onCancel={this.onSearch}
          cancelText={'Tìm'} />
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 10 }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          Click upper-left corner
        {sidebar}
        </Drawer>
      </div>
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
