import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
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

  render() {
    const {
      isLoaded,
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoaded ? (
            <section className="userInfo-container">
              <div className="image-container">
                <img data-testid="profile-image" src={ userImage } alt={ userName } />
                <Link to="/profile/edit" className="edit-link">
                  Editar perfil
                </Link>
              </div>
              <div className="infos-container">
                <h3>Nome</h3>
                <span>{ userName }</span>
                <h3>E-mail</h3>
                <span>{ userEmail }</span>
                <h3>Descrição</h3>
                <span>{ userDescription }</span>
              </div>
            </section>
          ) : <Loading />
        }
      </div>
    );
  }
}

export default Profile;
