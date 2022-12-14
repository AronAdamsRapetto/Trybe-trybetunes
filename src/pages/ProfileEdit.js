import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    isLoaded: true,
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
    isDisable: true,
  }

  componentDidMount() {
    this.setState({ isLoaded: false }, async () => {
      const user = await getUser();
      this.setState({
        isLoaded: true,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        userDescription: user.description,
      }, this.validateInputs);
    });
  }

  validateInputs = () => {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;
    if (userName.length === 0
      || userEmail.length === 0
      || userImage.length === 0
      || userDescription.length === 0
      || !userEmail.includes('@')
      || !userEmail.includes('.com')
    ) {
      this.setState({ isDisable: true });
    } else {
      this.setState({ isDisable: false });
    }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validateInputs());
  }

  handleClick = () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const { history } = this.props;
    this.setState({ isLoaded: false }, async () => {
      await updateUser({
        name: userName,
        email: userEmail,
        image: userImage,
        description: userDescription,
      });
      history.push('/profile');
    });
  }

  render() {
    const {
      isLoaded,
      userDescription,
      userEmail,
      userImage,
      isDisable,
      userName,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {/* <p className="gambiarra">Editar perfil</p> */}
        {
          isLoaded ? (
            <section className="form-container">
              <div className="perfil-image">
                <img src={ userImage } alt={ userName } />
                <input
                  type="text"
                  name="userImage"
                  value={ userImage }
                  onChange={ this.handleChange }
                  data-testid="edit-input-image"
                  placeholder="Insira um link"
                />
              </div>
              <label className="input-infos" htmlFor="inputName">
                Nome
                <span>Fique ?? vontade para usar seu nome social</span>
                <input
                  type="text"
                  name="userName"
                  value={ userName }
                  onChange={ this.handleChange }
                  id="inputName"
                  data-testid="edit-input-name"
                  placeholder="PiRaDeX"
                />
              </label>
              <label className="input-infos" htmlFor="inputEmail">
                E-mail
                <span>Escolha um e-mail que consulte diariamente</span>
                <input
                  type="email"
                  name="userEmail"
                  value={ userEmail }
                  onChange={ this.handleChange }
                  id="inputEmail"
                  data-testid="edit-input-email"
                  placeholder="joaodasilva@gmail.com"
                />
              </label>
              <label className="input-description" htmlFor="inputDescricao">
                Descri????o
                <textarea
                  id="inputDescricao"
                  name="userDescription"
                  value={ userDescription }
                  onChange={ this.handleChange }
                  data-testid="edit-input-description"
                  placeholder="Sobre mim"
                />
              </label>
              <button
                className="edit-button"
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisable }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </section>
          ) : <Loading />
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
