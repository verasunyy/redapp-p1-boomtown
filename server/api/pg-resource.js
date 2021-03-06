
function tagsQueryString(tags, itemId) {
  const parts = tags.map((tag, i) => `($${i + 1}, ${itemId})`);
  return parts.join(",") + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: 'INSERT INTO users(fullname, email, password) VALUES($1, $2, $3) RETURNING *', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      console.log(newUserInsert);
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        //getting the first element in the array: id=$1
        text: 'SELECT * FROM users WHERE id=$1 LIMIT 1',
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        console.log(user.rows)
        return user.rows[0];
      } catch (e) {
        throw ("User not found!")
      }
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid != $1`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (e) {
        throw ("Items not found");
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid = $1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw ("items not found");
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrowerid=$1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw ("borrowed items not found")
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query({
          text: `SELECT * FROM tags`,
        });
        return tags.rows;
      } catch (e) {
        throw ("tags not found")
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT tags.title, tags.id FROM tags, item_tags WHERE item_tags.itemid=$1 AND tags.id=item_tags.tagid;`, // @TODO: Advanced query Hint: use INNER JOIN
        values: [id]
      };
      try {
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (e) {
        throw ("tags for item not found")
      }
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;

              // Generate new Item query
              const addItemQuery = {
                text: `INSERT INTO items (title, description, ownerid) VALUES ($1, $2, $3) RETURNING *`,
                values: [title, description, user]
              };
              const newItem = await postgres.query(addItemQuery);

              // Generate tag relationships query
              const itemId = newItem.rows[0].id;
              const tagsId = tags.map(tag => tag.id);
              const addItemTagsQuery = {
                text: `INSERT INTO item_tags (tagid, itemid) VALUES ${tagsQueryString([...tagsId], itemId)}`,
                values: tagsId
              };
              const itemTags = await postgres.query(addItemTagsQuery);

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0])
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
