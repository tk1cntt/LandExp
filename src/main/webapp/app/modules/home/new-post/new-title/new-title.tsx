import * as React from 'react';

import { Translate } from 'react-jhipster';

export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h2>
        Tin mới đăng<span>Hiển thị 1 - 20 trong 100 Bất động sản</span>
        <div className="toolbox">
          <label htmlFor="sortby">Sắp xếp:</label>
          <select name="sortby" id="sortby">
            <option value="">Ngày đăng mới nhất</option>
            <option value="">Giá từ thấp đến cao</option>
            <option value="">Giá từ cao đến thấp</option>
          </select>
          <div className="listview-button active">
            <a href="#" />
          </div>
          <div className="gridview-button">
            <a href="#" />
          </div>
        </div>
      </h2>
    );
  }
}
