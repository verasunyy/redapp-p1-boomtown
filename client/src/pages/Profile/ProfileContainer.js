import React, { Component } from 'react';
import Profile from './Profile';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 3 }}>
        {({ loading, error, data }) => {
          if (loading) return "...";
          // <FullScreenLoader inverted />
          if (error) return <p>{`Error! ${error.message}`}</p>;
          console.log(data.user);
          return <Profile user={data.user} />;
        }}
      </Query >
    );
  }
}

export default ProfileContainer;
