import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h1>Profile page</h1>
        <Header />
      </div>
    );
  }
}

export default Profile;
