
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
const authMutations = require("./auth")
// -------------------------------
const { DateScalar } = require('../custom-types');


module.exports = app => {
  return {
    Date: DateScalar,

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {

      async items({ id }, args, { pgResource }, info) {
        try {
          const itemsByUser = await pgResource.getItemsForUser(id);
          return itemsByUser;
        } catch (e) {
          throw ("items not found");
        }
      },
      async borrowed({ id }, args, { pgResource }, info) {
        try {
          return await pgResource.getBorrowedItemsForUser(id);
        } catch (e) {
          throw ("borrowed items not found")
        }
      }
    },

    Item: {
      async itemowner({ ownerid }, args, { pgResource }, info) {
        try {
          return await pgResource.getUserById(ownerid);
        } catch (e) {
          throw ("itemowner not found");
        }
      },

      async tags({ id }, args, { pgResource }, info) {
        try {
          return await pgResource.getTagsForItem(id);
        } catch (e) {
          throw ("tags not found");
        }
      },
      async borrower({ borrowerid }, args, { pgResource }, info) {
        try {
          return await pgResource.getUserById(borrowerid);
        } catch (e) {
          throw ("borrower not found");
        }
      }
    },

    Mutation: {
      ...authMutations(app),
      async addItem(parent, { item }, { pgResource }, info) {
        // image = await image;
        const user = 2;
        // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        try {
          const newItem = await pgResource.saveNewItem({
            item: item,
            image: undefined,
            user
          });
          return newItem;
        } catch (e) {
          throw ("Whoops!");
        }
      }
    }
  };
};
