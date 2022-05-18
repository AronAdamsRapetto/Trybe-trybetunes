import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import FormLogin from '../components/FormLogin';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isDisable: true,
    nameLogin: '',
    isLoaded: true,
    LoggedIn: false,
  }

  handleChange = ({ target: { value } }) => {
    const minCharName = 3;
    this.setState({ nameLogin: value });
    if (value.length >= minCharName) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  handleClick = () => {
    const { nameLogin } = this.state;
    this.setState({ isLoaded: false }, async () => {
      await createUser({ name: nameLogin });
      this.setState({ LoggedIn: true });
    });
  }

  render() {
    const { isDisable, nameLogin, isLoaded, LoggedIn } = this.state;
    return (
      <div data-testid="page-login">
        {
          isLoaded ? <FormLogin
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            nameLogin={ nameLogin }
            isDisable={ isDisable }
          /> : <Loading />
        }
        {
          LoggedIn && <Redirect to="/search" />
        }
      </div>
    );
  }
}

export default Login;
