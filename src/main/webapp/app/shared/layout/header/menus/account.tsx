import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

const accountMenuItemsAuthenticated = (
  <>
    <DropdownItem tag={Link} to="/tai-khoan/danh-sach-tin-dang">
      <FontAwesomeIcon icon="newspaper" /> Tin đã đăng của bạn
    </DropdownItem>
    <DropdownItem tag={Link} to="/tai-khoan/thong-tin-tai-khoan">
      <FontAwesomeIcon icon="user-circle" /> Thông tin tài khoản
    </DropdownItem>
    <DropdownItem tag={Link} to="/tai-khoan/thay-doi-mat-khau">
      <FontAwesomeIcon icon="key" /> Thay đổi mật khẩu
    </DropdownItem>
    <DropdownItem tag={Link} to="/thoat">
      <FontAwesomeIcon icon="sign-out-alt" /> Thoát
    </DropdownItem>
  </>
);

const accountMenuItems = (
  <>
    <DropdownItem id="login-item" tag={Link} to="/dang-nhap">
      <FontAwesomeIcon icon="sign-in-alt" /> Đăng nhập
    </DropdownItem>
    <DropdownItem tag={Link} to="/dang-ky">
      <FontAwesomeIcon icon="sign-in-alt" /> Đăng ký
    </DropdownItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name="Tài khoản" id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
