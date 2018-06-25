/* tslint:disable */

import './grid-preview.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

export interface IHomeProp extends StateProps, DispatchProps {}

export class GridPreview extends React.Component {
  constructor(props) {
    super(props);
    this.getWidthBoundary = this.getWidthBoundary.bind(this);
    this.splitElementForGridView = this.splitElementForGridView.bind(this);
    this.drawingElement = this.drawingElement.bind(this);
  }

  componentDidMount() {
    this.splitElementForGridView();
  }

  state = {
    distance: 10,
    roundNumber: 100,
    dataTest: [
      {
        img: 'static/images/1.png',
        title: 'How to belong a beautiful house',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        type: 'BUILDING LAND'
      },
      {
        img: 'static/images/2.png',
        title: 'How to belong a beautiful house',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        type: 'DEVELOPING LAND'
      },
      {
        img: 'static/images/3.png',
        title: 'How to develop success',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        type: 'DEVELOPING LAND'
      },
      {
        img: 'static/images/4.png',
        title: 'Collaborating to success',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        type: 'DEVELOPING LAND'
      },
      {
        img: 'static/images/5.png',
        title: 'How to belong a beautiful house',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        type: 'DEVELOPING LAND'
      }
    ],
    widthOfParent: 0,
    widthOfSmallElement: 0,
    heightOfSmallElement: 0,
    widthOfBigElement: 0,
    heightOfBigElement: 0,
    heightBoundary: 0
  };

  getWidthBoundary = () => document.getElementById('preview-grid-mode').offsetWidth;

  splitElementForGridView = () => {
    if (!document.getElementById('preview-grid-mode')) {
      return;
    }
    const widthOfParent = this.getWidthBoundary();
    const widthOfSmallElement = (widthOfParent - 4 * this.state.distance - 3) * 3 / 11;
    const heightOfSmallElement = widthOfSmallElement * 3 / 5;
    const widthOfBigElement = (widthOfParent - 4 * this.state.distance - 3) * 5 / 11;
    const heightOfBigElement = heightOfSmallElement * 2 + 15;

    this.setState({
      widthOfParent: widthOfParent,
      widthOfSmallElement: widthOfSmallElement,
      heightOfSmallElement: heightOfSmallElement,
      widthOfBigElement: widthOfBigElement,
      heightOfBigElement: heightOfBigElement,
      heightBoundary: `${heightOfBigElement + 30}px`
    });
  };

  drawingElement = () => {
    const data = this.state.dataTest;
    return data.map((item, index) => {
      let transform;
      if (index === 0) {
        transform = `translate(${0}px, ${0}px)`;
        const height = `${this.state.heightOfBigElement}px`;
        const width = `${this.state.widthOfBigElement}px`;
        return (
          <div className="image-grid-view" style={{ height, width, transform }}>
            <div className="caption-img" style={{ width }}>
              <p className="active">{item.title}</p>
              <p>{item.content}</p>
              <p className="cat-title border-left-red">{item.type}</p>
            </div>
            <img src={item.img} height={this.state.heightOfBigElement} width={this.state.widthOfBigElement} />
          </div>
        );
      } else {
        const height = `${this.state.heightOfSmallElement}px`;
        const width = `${this.state.widthOfSmallElement}px`;
        if (index === 1) {
          transform = `translate(${this.state.widthOfBigElement + 15}px, ${0}px)`;
        } else if (index === 2) {
          transform = `translate(${this.state.widthOfBigElement + 15 + this.state.widthOfSmallElement + 15}px, ${0}px)`;
        } else if (index === 3) {
          transform = `translate(${this.state.widthOfBigElement + 15}px, ${this.state.heightOfSmallElement + 15}px)`;
        } else if (index === 4) {
          transform = `translate(${this.state.widthOfBigElement + 15 + this.state.widthOfSmallElement + 15}px, ${this.state
            .heightOfSmallElement + 15}px)`;
        } else {
          transform = `translate(${-100000}px, ${-10000}px)`;
        }
        return (
          <div className="image-grid-view" style={{ height, width, transform }}>
            <div className="caption-img" style={{ width }}>
              <p>{item.title}</p>
              <p className="cat-title border-left-cyan">{item.type}</p>
            </div>
            <img src={item.img} height={this.state.heightOfSmallElement} width={this.state.widthOfSmallElement} />
          </div>
        );
      }
    });
  };

  render() {
    const height = this.state.heightBoundary;
    return (
      <Row id="preview-grid-mode" style={{ height }}>
        {this.drawingElement()}
        {/*<ReactResizeDetector handleWidth handleHeight onResize={ this.splitElementForGridView } />*/}
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GridPreview);
