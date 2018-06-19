import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const ManagerMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Manager" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/service-fee">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Bảng phí dịch vụ
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/region">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý khu vực
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/banner">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Banner
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
