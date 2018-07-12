import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/quan-ly/region">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Region
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/city">
      <FontAwesomeIcon icon="asterisk" />&nbsp; City
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/district">
      <FontAwesomeIcon icon="asterisk" />&nbsp; District
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/street">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Street
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/house">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Danh sách tin đăng
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/service-fee">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Service Fee
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/house-tracking">
      <FontAwesomeIcon icon="asterisk" />&nbsp; House Tracking
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/house-photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp; House Photo
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/land-project">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Land Project
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/land-project-photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Land Project Photo
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/article">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Article
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/category">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Category
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/user-profile">
      <FontAwesomeIcon icon="asterisk" />&nbsp; User Profile
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/user-subscription">
      <FontAwesomeIcon icon="asterisk" />&nbsp; User Subscription
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/user-tracking">
      <FontAwesomeIcon icon="asterisk" />&nbsp; User Tracking
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/user-feed">
      <FontAwesomeIcon icon="asterisk" />&nbsp; User Feed
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/search-tracking">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Search Tracking
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/user-financial">
      <FontAwesomeIcon icon="asterisk" />&nbsp; User Financial
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/potential-customer">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Potential Customer
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/banner">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Banner
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/payment">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Payment
    </DropdownItem>
    <DropdownItem tag={Link} to="/quan-ly/ward">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Ward
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
