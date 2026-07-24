const { drizzle } = require("drizzle-orm/node-postgres");

// postgres://<username>:<pw>@<host>:<port>/<db_name>
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
