import React, { Component } from 'react';
import Profile from './Profile';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from "../../context/ViewerProvider";
class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: (this.props.match.params.userId || viewer.id) }}>
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader inverted />;
              if (error) return <p>{`Error! ${error.message}`}</p>;
              return <Profile user={data.user} />;
            }}
          </Query >
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
