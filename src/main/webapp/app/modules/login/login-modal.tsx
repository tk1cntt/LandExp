import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Container, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
  loading: any;
  location: any;
  history: any;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Col md="12"><Translate contentKey="login.title">Sign in</Translate></Col>
          <Col md="12">
            <AvForm onSubmit={this.handleSubmit}>
              <Row>
                <Col md="12">
                  {loginError ? (
                    <Alert color="danger">
                      <Translate contentKey="login.messages.error.authentication">
                        <strong>Failed to sign in!</strong> Please check your credentials and try again.
                        </Translate>
                    </Alert>
                  ) : null}
                </Col>
                <Col md="12">
                  <AvField
                    name="username"
                    label={translate('global.form.username')}
                    placeholder={translate('global.form.username.placeholder')}
                    required
                    errorMessage="Username cannot be empty!"
                    autoFocus
                  />
                  <AvField
                    name="password"
                    type="password"
                    label={translate('login.form.password')}
                    placeholder={translate('login.form.password.placeholder')}
                    required
                    errorMessage="Password cannot be empty!"
                  />
                  <Button color="primary" type="submit">
                    <Translate contentKey="login.form.button">Sign in</Translate>
                  </Button>
                </Col>
              </Row>
              <div className="mt-1">&nbsp;</div>
              <div>
                <Link to="/reset/request">
                  <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
                </Link>
              </div>
              <div>
                <span>
                  <Translate contentKey="global.messages.info.register.noaccount">You don't have an account yet?</Translate>
                </span>{' '}
                <Link to="/dang-ky">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </div>
            </AvForm>
          </Col>
        </Container>
      </Row>
    );
  }
}

export default LoginModal;
