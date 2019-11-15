const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dashboard",
  password: "tamu4740",
  post: 5432
});

module.exports = pool;
