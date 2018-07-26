import React from 'react';
import { Button, Col, Alert, Row, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Card } from 'antd';

import { locales } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IUserSettingsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUserSettingsState {
  account: any;
}

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  componentDidMount() {
    this.props.getSession();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    const account = {
      ...this.props.account,
      ...values
    };

    this.props.saveAccountSettings(account);
    event.persist();
  };

  render() {
    const { account } = this.props;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              {this.props.loading ? (
                <Loading />
              ) : (
                <Row>
                  <Card title="Thông tin tài khoản">
                    <AvForm id="settings-form" onValidSubmit={this.handleValidSubmit}>
                      {/* First name */}
                      <AvField
                        className="form-control"
                        name="firstName"
                        label={translate('settings.form.firstname')}
                        id="firstName"
                        placeholder={translate('settings.form.firstname.placeholder')}
                        validate={{
                          required: { value: true, errorMessage: translate('settings.messages.validate.firstname.required') },
                          minLength: { value: 1, errorMessage: translate('settings.messages.validate.firstname.minlength') },
                          maxLength: { value: 50, errorMessage: translate('settings.messages.validate.firstname.maxlength') }
                        }}
                        value={account.firstName}
                      />
                      {/* Last name */}
                      <AvField
                        className="form-control"
                        name="lastName"
                        label={translate('settings.form.lastname')}
                        id="lastName"
                        placeholder={translate('settings.form.lastname.placeholder')}
                        validate={{
                          required: { value: true, errorMessage: translate('settings.messages.validate.lastname.required') },
                          minLength: { value: 1, errorMessage: translate('settings.messages.validate.lastname.minlength') },
                          maxLength: { value: 50, errorMessage: translate('settings.messages.validate.lastname.maxlength') }
                        }}
                        value={account.lastName}
                      />
                      {/* Email */}
                      <AvField
                        name="email"
                        label={translate('global.form.email')}
                        placeholder={translate('global.form.email.placeholder')}
                        validate={{
                          required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                          pattern: { value: '^0[0-9-]*$', errorMessage: translate('global.messages.validate.email.invalid') },
                          minLength: { value: 10, errorMessage: translate('global.messages.validate.email.minlength') },
                          maxLength: { value: 11, errorMessage: translate('global.messages.validate.email.maxlength') }
                        }}
                        value={account.email}
                      />
                      <Button color="primary" type="submit">
                        <Translate contentKey="settings.form.button">Save</Translate>
                      </Button>
                    </AvForm>
                  </Card>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  loading: authentication.loading
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
