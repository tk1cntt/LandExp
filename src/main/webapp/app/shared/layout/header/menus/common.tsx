import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const CommonMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Commons" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/region">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý khu vực
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/city">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý tỉnh thành
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/district">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý quận huyện
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/ward">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Quản lý xã phường
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
