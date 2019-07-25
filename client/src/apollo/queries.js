import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
    }
  }
`;
// export const ITEM_QUERY = gql`
//   query item($id: ID!) {
//     item(id:$id){
//     ...ItemFields
//     }
//   }
//   ${ItemFields}
// `;
// console.log("Item Query: " + ITEM_QUERY);

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID!) {
    items(filter: $filter){
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id){
      id
      email
      fullname
      bio
      items{
        ... ItemFields
      }
      borrowed{
        ... ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query tags {
    tags{
    id
    title
    }
  }
`;

// # @TODO: Pass the item and image into the addItem mutation as arguments
// # and return the new item id when the mutation is complete.
export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(
      item:$item
    ){
      id
    }
  }
`;

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query {
    viewer{
      id
      email
      fullname
      bio
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user){
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
login(user: $user){
  id
}
  }
`;
