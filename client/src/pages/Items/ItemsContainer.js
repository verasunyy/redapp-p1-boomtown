import React, { Component } from 'react';
import Items from './Items';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from '../../apollo/queries';

import { ViewerContext } from "../../context/ViewerProvider";

class ItemsContainer extends Component {
  render() {

    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader inverted />;
              if (error) return <p>{`Error! ${error.message}`}</p>;
              return <Items items={data.items} />;
            }}
          </Query >
        )}
      </ViewerContext.Consumer>
    );
  }
}
export default ItemsContainer;
