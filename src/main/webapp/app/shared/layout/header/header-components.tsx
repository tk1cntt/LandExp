import * as React from 'react';
import { Translate } from 'react-jhipster';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavItem, NavLink, NavbarBrand, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav caret className="d-flex align-items-center">
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <Link to={'/'}>
      <img src="static/images/logo.png" alt="Logo" />
    </Link>
  </div>
);

export const BreadcrumbComponent = props => (
  <Breadcrumb>
    {props.layout.map(
      item =>
        item.active ? (
          <BreadcrumbItem active>{item.label}</BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <a href={item.url}>{item.label}</a>
          </BreadcrumbItem>
        )
    )}
  </Breadcrumb>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);

export const Register = props => (
  <NavItem>
    <NavLink tag={Link} to="/dang-ky" className="d-flex align-items-center">
      <FontAwesomeIcon icon="user-plus" />
      <span>Đăng ký</span>
    </NavLink>
  </NavItem>
);

export const Login = props => (
  <NavItem>
    <NavLink tag={Link} to="/dang-nhap" className="d-flex align-items-center">
      <FontAwesomeIcon icon="sign-in-alt" />
      <span>Đăng nhập</span>
    </NavLink>
  </NavItem>
);

export const Post = props => (
  <NavItem>
    <NavLink tag={Link} to="/tai-khoan/dang-tin" className="d-flex align-items-center">
      <FontAwesomeIcon icon="edit" />
      <span>Đăng tin</span>
    </NavLink>
  </NavItem>
);
