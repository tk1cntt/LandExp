import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const ManagerMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Manager" id="entity-menu">
    <DropdownItem tag={Link} to="/quan-ly/bang-phi-dich-vu">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Bảng phí dịch vụ
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/khu-vuc">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý khu vực
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/tai-khoan-nguoi-dung">
      <FontAwesomeIcon icon="user" /> Tài khoản người dùng
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/banner">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Banner
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
