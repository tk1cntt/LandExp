import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Container, Alert, Button } from 'reactstrap';
import { Card } from 'antd';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IRegisterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRegisterState {
  password: string;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handleRegister(values.username, values.email, values.firstPassword, this.props.currentLocale);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              <Row>
                <Card title="Đăng ký tài khoản">
                  <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
                    <AvField
                      name="username"
                      label={translate('global.form.username')}
                      placeholder={translate('global.form.username.placeholder')}
                      validate={{
                        required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                        pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                        minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                        maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                      }}
                    />
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
                    />
                    <AvField
                      name="firstPassword"
                      label={translate('global.form.newpassword')}
                      placeholder={translate('global.form.newpassword.placeholder')}
                      type="password"
                      onChange={this.updatePassword}
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                        minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                        maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                      }}
                    />
                    <PasswordStrengthBar password={this.state.password} />
                    <AvField
                      name="secondPassword"
                      label={translate('global.form.confirmpassword')}
                      placeholder={translate('global.form.confirmpassword.placeholder')}
                      type="password"
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                        minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                        maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                        match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                      }}
                    />
                    <Button id="register-submit" color="primary" type="submit">
                      <Translate contentKey="register.form.button">Register</Translate>
                    </Button>
                  </AvForm>
                  <p>&nbsp;</p>
                  <div>
                    <span>Đã có tài khoản? Hãy </span>
                    <Link className="alert-link" to={'/dang-nhap'}>
                      <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
                    </Link>
                  </div>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
