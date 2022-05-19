import React from 'react';
import PropTypes from 'prop-types';

class FormSearch extends React.Component {
  render() {
    const { handleClick, handleChange, searchInput, isDisable } = this.props;
    return (
      <form className="search-form">
        <input
          type="type"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          value={ searchInput }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDisable }
          onClick={ handleClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

FormSearch.propTypes = {
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  searchInput: PropTypes.string,
  isDisable: PropTypes.bool,
};

FormSearch.defaultProps = {
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  searchInput: 'artista ou banda',
  isDisable: false,
};

export default FormSearch;
