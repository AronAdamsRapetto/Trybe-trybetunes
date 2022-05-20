import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import FormLogin from '../components/FormLogin';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  state = {
    isDisable: true,
    nameLogin: '',
    isLoaded: true,
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
    const { history } = this.props;
    this.setState({ isLoaded: false }, async () => {
      await createUser({ name: nameLogin });
      history.push('/search');
    });
  }

  render() {
    const { isDisable, nameLogin, isLoaded } = this.state;
    return (
      <div data-testid="page-login" className="container-login">
        <img
          src="https://s3-alpha-sig.figma.com/img/cb6b/b1a4/61f8022ad1b66f0294f86a1998c00d51?Expires=1653868800&Signature=VEgrgMIAJtYWCYlNDcbt1rY2Ivy2DOAAJlvO3scAXMG0kMZRxHmq3DoBR30kzMSqZnT-OLrJMkZQnkOCO323Kt5ek2RcAAl3r-BhdG2kxrk9tOWn-ER37toqeheS4Dz25SgxtNWK5SrjgADVxQLLAJ61~Szfv~lYXyzFqFEjAhgzJqCNUxeBCfzltbSlw74O9eDTeaHJsW6YzOYnZL-AiXsddKd8XlDunxj82VNc6EP6wSS21J2NvYU8nvK47JIETwbId8HstJMMi0dg6wDzdgRFs9AAz~fUFdohlL20ikws4xPC1Z18uO80AXJ-ezkge4LiqcL7FsdvG8fgSL9Ryg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt="Imagem Logo"
          className="image-login"
        />
        {
          isLoaded ? <FormLogin
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            nameLogin={ nameLogin }
            isDisable={ isDisable }
          /> : <Loading />
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
