# Boomtown 🏙

Boomtown is a web app that allow users share and borrow items among users by using react.js for front-end, Postgres as the database.

## Author

This is my first web app project with React and database. A lot of new technology and thinking process learned from the project.

## Server

Back-end application to support a local sharing economy. The app use PostgreSQL as a relational database to store shareable items and user info, Node.js/Express as its web server, and GraphQL for its client-facing API.

### Installation

```bash
npm install
```

### Run

```bash
npm run start:dev
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run Jest tests:

```
npm run jest
```

Run Jest tests, and watch for changes:

```bash
npm run jest:watch
```

Run all tests:

```bash
npm run test
```

### Schema

Type Item, User, Tag, Query and Mutation

### Resovers

using async await with try{} and catch(err){} and (parent, args, context, info)

Example:

```

Item: {
    async tags({ id }, args, { pgResource }, info) {
        try {
          return await pgResource.getTagsForItem(id);
        } catch (e) {
          throw ("tags not found");
        }
    }
}

```

### pg-resource

Add tag item relationship query:

```
function tagsQueryString(tags, itemId) {
  const parts = tags.map((tag, i) => `($${i + 1}, ${itemId})`);
  return parts.join(",") + ";";
}
```

using the tagsQueryString function to get the VALUES

```
const itemId = newItem.rows[0].id;
              const tagsId = tags.map(tag => tag.id);
              const addItemTagsQuery = {
                text: `INSERT INTO item_tags (tagid, itemid) VALUES ${tagsQueryString([...tagsId], itemId)}`,
                values: tagsId
              };
              const itemTags = await postgres.query(addItemTagsQuery);

```

### Technology used

- GraphQl
- Express
- Apollo Server
- Postgres
- React.js
- Node.js

## Client

Front-end of the app using mainly React with statefull component, and Apollo Client to connect with the back-end of the app getting the data, with the authentication on the user signup and login

Commands must be run from the `client` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

### Build

```bash
npm run build
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run all tests:

```bash
npm run test
```

### Technology used

- React, Stateless and Statefull components
- Cookies
- Async and await
- Apollo Client
- Material UI
- Redux
- Context
- Routes
