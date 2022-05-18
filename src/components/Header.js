import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    isLoaded: false,
    userName: '',
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const userNameResponse = await getUser();
    console.log(userNameResponse);
    this.setState({ isLoaded: true, userName: userNameResponse.name });
  }

  render() {
    const { isLoaded, userName } = this.state;
    return (
      <header data-testid="header-component">
        {isLoaded ? <span data-testid="header-user-name">{ userName }</span>
          : <Loading />}
      </header>
    );
  }
}

export default Header;
