import React, { Component } from 'react';
import Share from './Share';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';
// Hint: query tags

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          // console.log(data.tags);
          return <Share tags={data.tags} />;
        }}
      </Query >
    );
  }
}

export default ShareContainer;
