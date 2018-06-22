import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import SearchPage from 'app/modules/search/search-page';

export interface ICategoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICategoryState extends IPaginationBaseState {
  search: string;
}

export class Category extends React.Component<ICategoryProps, ICategoryState> {
  state: ICategoryState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { categoryList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage />
        <Container>
          <h2 id="category-heading">
            <Translate contentKey="landexpApp.category.home.title">Categories</Translate>
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />&nbsp;
              <Translate contentKey="landexpApp.category.home.createLabel">Create new Category</Translate>
            </Link>
          </h2>
          <Row>
            <Col sm="12">
              <AvForm onSubmit={this.search}>
                <AvGroup>
                  <InputGroup>
                    <AvInput
                      type="text"
                      name="search"
                      value={this.state.search}
                      onChange={this.handleSearch}
                      placeholder={translate('landexpApp.category.home.search')}
                    />
                    <Button className="input-group-addon">
                      <FontAwesomeIcon icon="search" />
                    </Button>
                    <Button type="reset" className="input-group-addon" onClick={this.clear}>
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </InputGroup>
                </AvGroup>
              </AvForm>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('name')}>
                    <Translate contentKey="landexpApp.category.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('nameAlias')}>
                    <Translate contentKey="landexpApp.category.nameAlias">Name Alias</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('createAt')}>
                    <Translate contentKey="landexpApp.category.createAt">Create At</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('updateAt')}>
                    <Translate contentKey="landexpApp.category.updateAt">Update At</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {categoryList.map((category, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${category.id}`} color="link" size="sm">
                        {category.id}
                      </Button>
                    </td>
                    <td>{category.name}</td>
                    <td>{category.nameAlias}</td>
                    <td>
                      <TextFormat type="date" value={category.createAt} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={category.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${category.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${category.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${category.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Row className="justify-content-center">
            <JhiPagination
              items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
            />
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ category }: IRootState) => ({
  categoryList: category.entities,
  totalItems: category.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Category);
