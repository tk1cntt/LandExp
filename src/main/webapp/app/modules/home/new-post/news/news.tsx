import './news.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getSession } from 'app/shared/reducers/authentication';

export interface INewsProp extends StateProps, DispatchProps {
  news: any;
}

export class News extends React.Component<INewsProp> {
  render() {
    const marginLeft = '30px;';
    return (
      <div className="post-item">
        <div className="item-thumbnail">
          <a>
            <img src={this.props.news.img} alt={`${this.props.news.title}/${this.props.news.project}`} />
          </a>
          {this.props.news.sell ? (
            <div className="type sell">{this.props.news.action}</div>
          ) : (
            <div className="type hire">{this.props.news.action}</div>
          )}
        </div>
        <div className="item-info">
          <a>
            <h3 className="title">{this.props.news.title}</h3>
          </a>
          <p className="subtitle">{this.props.news.project}</p>
          <p className="price">
            <span>{this.props.news.price}</span> {this.props.news.unit}
          </p>
          <div className="property">
            <span>
              <FontAwesomeIcon icon="square" style={{ marginRight: '5px' }} /> {this.props.news.acreage}
            </span>
            <span>
              <FontAwesomeIcon icon="bed" style={{ marginRight: '5px' }} /> {this.props.news.bedroom}
            </span>
            <span>
              <FontAwesomeIcon icon="bath" style={{ marginRight: '5px' }} /> {this.props.news.bathroom}
            </span>
            <span>
              <FontAwesomeIcon icon="car" style={{ marginRight: '5px' }} />{' '}
              {this.props.news.garage ? <FontAwesomeIcon style={{ marginLeft }} icon="check" /> : <FontAwesomeIcon icon="" />}
            </span>
          </div>
          <p className="location">{this.props.news.location}</p>
          <div className="button-group">
            <p className="post-date">{this.props.news.postDate}</p>
            <span className="favorite">
              <a>
                <FontAwesomeIcon icon="heart" />
              </a>{' '}
            </span>
            <span className="contact contact-distance">
              <a href="#">Liên hệ</a>
            </span>
          </div>
        </div>
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
)(News);
