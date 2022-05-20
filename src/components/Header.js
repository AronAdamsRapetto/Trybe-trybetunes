import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends React.Component {
  state = {
    isLoaded: false,
    userName: '',
    userImage: '',
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const userResponse = await getUser();
    this.setState({
      isLoaded: true,
      userName: userResponse.name,
      userImage: userResponse.image,
    });
  }

  render() {
    const { isLoaded, userName, userImage } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header-container">
          <img
            src="https://s3-alpha-sig.figma.com/img/b9aa/b33b/90cfc7e08c97fce6f1d6e8abbfff6e6e?Expires=1653868800&Signature=RthhCXOJVoxnv8yr5C4JOQcPgbWoxwoQ9JOhRcoo6nDM~3-c5ejHgDczvPGHVvge7sb2jb2-blYamFGJYLmIyJsqZWgukx4IBJ1QAwrmfxBCek9vM0PE85eJ3Z~MtmwgOaAW5U0hiOS7LVV~mYwVtq-SKZGOOZP4wnoOgjasjCBr6JQuSaPqS~ew4OKTgfMAkUZryvcr9wD6ipz1n7FElggzgck7EKZ~YCJKHh2tvthcvVFhUUE2JPwjdwxTJzvnD7BMWQZQ34Q-j~10ZCXK-rlu2mJzJvYjjlkgH5EUKpkxGqQPMR7JIBRoK1hBFnyp72x~DQuqHTU0ZPDj-VqauA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="Imagem Logo"
          />
          {
            isLoaded ? (
              <div className="container-user">
                <div className="container-icon">
                  <img src={ userImage } alt={ userName } />
                </div>
                <span data-testid="header-user-name">{ userName }</span>
              </div>
            ) : <Loading />
          }
        </div>
        <nav className="container-links">
          <div>
            <Link
              to="/search"
              data-testid="link-to-search"
              className="link-navigation"
            >
              Pesquisa
            </Link>
          </div>
          <div>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="link-navigation"
            >
              Favoritos
            </Link>
          </div>
          <div>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="link-navigation"
            >
              Perfil
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
