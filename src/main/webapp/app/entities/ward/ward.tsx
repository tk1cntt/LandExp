import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Icon } from 'antd';

// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './ward.reducer';
import { IWard } from 'app/shared/model/ward.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IWardState {
  search: string;
}

export class Ward extends React.Component<IWardProps, IWardState> {
  state: IWardState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
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

  render() {
    const { wardList, match } = this.props;
    return (
      <div>
        <h2 id="ward-heading">
          <Translate contentKey="landexpApp.ward.home.title">Wards</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="landexpApp.ward.home.createLabel">Create new Ward</Translate>
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
                    placeholder={translate('landexpApp.ward.home.search')}
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
                <th>
                  <Translate contentKey="landexpApp.ward.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.ward.enabled">Enabled</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.ward.createAt">Create At</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.ward.updateAt">Update At</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.ward.district">District</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {wardList.map((ward, i) => (
                <tr key={`entity-${i}`}>
                  <td>{ward.name}</td>
                  <td>{ward.enabled ? <Icon type="check-square" style={{ color: 'green' }} /> : <Icon type="close-square" style={{ color: 'red' }} />}</td>
                  <td>
                    <TextFormat type="date" value={ward.createAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={ward.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{ward.districtId ? <Link to={`district/${ward.districtId}`}>{ward.districtId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ward.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ward.id}/delete`} color="danger" size="sm">
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
      </div>
    );
  }
}

const mapStateToProps = ({ ward }: IRootState) => ({
  wardList: ward.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Ward);
