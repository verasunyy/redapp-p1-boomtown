import React, { Component } from 'react';
import Items from './Items';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from '../../apollo/queries';

import { ViewerContext } from "../../context/ViewerProvider";
// console.log(ALL_ITEMS_QUERY);
// const GET_TAGS =

//   gql`
// {
//   tags {
//     id
//     title
//   }
// }
// `;


class ItemsContainer extends Component {
  render() {

    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader inverted />;
              if (error) return <p>{`Error! ${error.message}`}</p>;
              console.log(data.items);
              return <Items items={data.items} />;
            }}
          </Query >
        )}
      </ViewerContext.Consumer>
    );

    // return (
    //   <Query query={GET_TAGS}>
    //     {({ loading, error, data }) => {
    //       if (loading) return "Loading...";
    //       if (error) return `Error! ${error.message}`;
    //       // console.log(data);
    //       // console.log(data.tags);
    //       return <Items tags={data.tags} />
    //     }}
    //   </Query>
    // )
  }

}
export default ItemsContainer;
