import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const StaffMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Staff" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/house">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tin đăng
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/house-photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Ảnh tin đăng
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/land-project">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Các dự án
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/land-project-photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Ảnh các dự án
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/article">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tin tức
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/category">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Danh mục tin tức
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/potential-customer">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Khách hàng tiềm năng
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/user-financial">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tư vấn tài chính
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/payment">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Thông tin thanh toán
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
