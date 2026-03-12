
const { Client } = require('pg');
const url = "postgresql://neondb_owner:npg_5AymQF9bRBnL@ep-purple-truth-ahbu73y7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function testConnection() {
  const client = new Client({
    connectionString: url,
  });

  try {
    console.log("Attempting to connect to database...");
    await client.connect();
    console.log("Connection successful!");
    const res = await client.query('SELECT NOW()');
    console.log("Database time:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

testConnection();
