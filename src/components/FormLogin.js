import React from 'react';
import PropTypes from 'prop-types';
import '../pages/Login.css';

class FormLogin extends React.Component {
  render() {
    const { handleChange, handleClick, nameLogin, isDisable } = this.props;
    return (
      <form className="form">
        <input
          type="text"
          placeholder="Nome"
          data-testid="login-name-input"
          onChange={ handleChange }
          value={ nameLogin }
        />
        <button
          type="button"
          disabled={ isDisable }
          data-testid="login-submit-button"
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

FormLogin.propTypes = {
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  nameLogin: PropTypes.string,
  isDisable: PropTypes.bool,
};

FormLogin.defaultProps = {
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  nameLogin: 'nome',
  isDisable: false,
};

export default FormLogin;
