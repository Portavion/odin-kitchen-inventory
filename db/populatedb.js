#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  added DATE
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Hi there!', 'Amendo', NOW()),
  ('Hello World!', 'Charles', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // connectionString: `postgresql://${process.env.USER}:${process.env.PGPASSWORD}@localhost:5432/top_messages`,
    connectionString: `postgresql://postgres:${process.env.PGPASSWORD}@junction.proxy.rlwy.net:38370/railway
`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
