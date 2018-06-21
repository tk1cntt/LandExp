import './search.css';
import * as React from 'react';

import { Translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap'

export default class Search extends React.Component {

  constructor (props) {
    super(props);
  }

  getMessage = () => (<Translate contentKey="search.location.title">Input your location or project</Translate>);

  render() {
    return (
      <div className="search-box">
        <div className="top-search-box">
          <div className="select">
            <select id="type">
              {
                this.props.land.map(item => (<option value={ item.value }>{ item.key }</option>))
              }
            </select>
          </div>
          <div className="keyword">
            <input type="text" placeholder={ this.getMessage() } />
          </div>
          <div className="clearfix" />
        </div>
        <div className="bottom-search-box">
          <div className="select">
            <label htmlFor=""><Translate contentKey="search.range">Range of price</Translate></label>
            <select id="range">
              {
                this.props.range.map(item => (<option value={ item.value }>{ item.key }</option>))
              }
            </select>
          </div>
          <div className="select">
            <label htmlFor=""><Translate contentKey="search.acreage">Acreage</Translate></label>
            <select id="acreage">
              {
                this.props.acreage.map(item => (<option value={ item.value }>{ item.key }</option>))
              }
            </select>
          </div>
          <div className="select">
            <label htmlFor=""><Translate contentKey="search.bedroom">Number of bedroom</Translate></label>
            <select id="bedroom">
              { this.props.bedroom.map(item => (
                <option value={ item }>{ item }</option>
              ))}
            </select>
          </div>
          <div className="select">
            <label htmlFor=""><Translate contentKey="search.bathroom">Number of bathroom</Translate></label>
            <select id="bathroom">
              { this.props.bathroom.map(item => (<option value={ item }>{ item }</option>))}
            </select>
          </div>
          <div className="clearfix"></div>
        </div>
        <button type="submit"><Translate contentKey="search.title">Search</Translate></button>
      </div>
    );
  }
}
