const { Pool } = require('pg');
const url = require('url');

let pool;

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

  pool = new Pool(config);
} else {
  // default dev env
  pool = new Pool();
}

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
  },
  pool: pool
}
