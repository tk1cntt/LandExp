import '../../../../swagger-ui/dist/css/header.css';

import * as React from 'react';

import {Navbar, Nav, NavbarToggler, NavbarBrand, Collapse} from 'reactstrap';

import Menu from './banner/menu';
import Search from './search/search';
import Demand from './demand/demand';
import Download from './download/download';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  render() {
    const land = [
      {
        value: -1,
        key: 'selectLand'
      }, {
        value: 0,
        key: 'Chung cu'
      }, {
        value: 1,
        key: 'Nhà Riêng'
      }
    ];

    const range = [
      {
        value: 0,
        key: 'Du?i 1 t?'
      }, {
        value: 1,
        key: '1 - 2 t?'
      }, {
        value: 2,
        key: '2 - 5 t?'
      }, {
        value: 3,
        key: 'trên 5 t?'
      }
    ];

    const acreage = [
      {
        value: 0,
        key: '80 - 100m2'
      }, {
        value: 1,
        key: '100 - 150m2'
      }, {
        value: 2,
        key: 'trên 150m2'
      }
    ];

    const bedroom = [1, 2, 3, 4];
    const bathroom = [1, 2, 3, 4];
    return (
      <div id="app-header" className="header">
        <div className="container">
          <Menu />
          <div className="search">
            <Demand />
            <Search land={ land }
                    range={ range }
                    acreage={ acreage }
                    bedroom={ bedroom }
                    bathroom={ bathroom }
            />
            <Download />
          </div>
        </div>
      </div>
    );
  }
}
