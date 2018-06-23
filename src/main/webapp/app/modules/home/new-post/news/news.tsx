import './news.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class News extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  state = {};

  render() {
    const marginLeft = '30px;';
    return (
      <div id="news" className="listview-left">
        {this.props.data.map(item => (
          <div className="post-item">
            <div className="item-thumbnail">
              <a>
                <img src={item.img} alt={`${item.title}/${item.project}`} />
              </a>
              {item.sell ? <div className="type sell">{item.action}</div> : <div className="type hire">{item.action}</div>}
            </div>
            <div className="item-info">
              <a>
                <h3 className="title">{item.title}</h3>
              </a>
              <p className="subtitle">{item.project}</p>
              <p className="price">
                <span>{item.price}</span> {item.unit}
              </p>
              <div className="property">
                <span className="compact">{item.acreage}</span>
                <span className="bedroom">{item.bedroom}</span>
                <span className="bathroom">{item.bathroom}</span>
                <span className="garage">
                  {item.garage ? <FontAwesomeIcon style={{ marginLeft }} icon="check" /> : <FontAwesomeIcon icon="" />}
                </span>
              </div>
              <p className="location">{item.location}</p>
              <div className="button-group">
                <p className="post-date">{item.postDate}</p>
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
        ))}
        }
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
