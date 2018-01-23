const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  // for single-action queries
  query: async (queryText, params = []) => {
    const start = Date.now();
    try {
      const dbResult = await pool.query(queryText, params);
      const duration = Date.now() - start;
      console.log('executed query', { queryText, duration, rows: dbResult.rowCount });
      return dbResult;
    } catch (e) {
      console.error('Database access error', e);
      throw e;
    }
  },
  // for transactions
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query.bind(client);

      // monkey patching to keep track of query executed
      client.query = () => {
        client.lastQuery = arguments;
        client.query.apply(client, arguments);
      };

      const timeout = setTimeout(() => {
        console.error('A db client has been checked out for more than 5 seconds.');
        console.error(`The last executed query on this client was: ${client.lastQuery}`);
      }, 5000);

      const release = (err) => {
        done(err);
        clearTimeout(timeout);
        client.query = query;  // reverse monkey patch
      }

      callback(err, client, done);
    });
  }
}
