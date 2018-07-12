import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const StaffMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Staff" id="entity-menu">
    <DropdownItem tag={Link} to="/quan-ly/tinh-thanh">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý tỉnh thành
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/quan-huyen">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý quận huyện
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/xa-phuong">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý xã phường
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/tin-dang">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý tin đăng
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/house-photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Ảnh tin đăng
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/cac-du-an">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Các dự án
    </DropdownItem>
    {/*
    <DropdownItem tag={Link} to="/quan-ly/land-project-photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Ảnh các dự án
    </DropdownItem>
    */}
    <DropdownItem tag={Link} to="/quan-ly/tin-tuc">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tin tức
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/danh-muc-tin-tuc">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Danh mục tin tức
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/khach-hang-tiem-nang">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Khách hàng tiềm năng
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/tu-van-tai-chinh">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tư vấn tài chính
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/thanh-toan">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Thông tin thanh toán
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
