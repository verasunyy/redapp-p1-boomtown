# Boomtown 🏙

## Server

Back-end application to support a local sharing economy. The app use PostgreSQL as a relational database to store shareable items and user info, Node.js/Express as its web server, and GraphQL for its client-facing API.

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

## Client

Commands must be run from the `client` directory:
