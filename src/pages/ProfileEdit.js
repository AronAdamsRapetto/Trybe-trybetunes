import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    isLoaded: true,
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
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
      });
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const {
      isLoaded,
      userDescription,
      userEmail,
      userImage,
      userName,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoaded ? (
            <section className="form-container">
              <div className="perfil-image">
                <img src="https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=2000" alt="" />
                <input
                  type="text"
                  id="inputimagem"
                  data-testid="edit-input-image"
                  placeholder="Insira um link"
                />
              </div>
              <label className="input-infos" htmlFor="inputName">
                Nome
                <span>Fique à vontade para usar seu nome social</span>
                <input
                  type="text"
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
                  id="inputEmail"
                  data-testid="edit-input-email"
                  placeholder="joaodasilva@gmail.com"
                />
              </label>
              <label className="input-description" htmlFor="inputDescricao">
                Descrição
                <textarea
                  id="inputDescricao"
                  data-testid="edit-input-description"
                  placeholder="Sobre mim"
                />
              </label>
              <button className="edit-button" type="button">Salvar</button>
            </section>
          ) : <Loading />
        }
      </div>
    );
  }
}

export default ProfileEdit;
