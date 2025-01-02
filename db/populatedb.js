#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const itemSQL = `
CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR ( 255 ),
);

INSERT INTO item (item_name) 
VALUES
  ('Beurre'),
  ('Pitch);
`;

const storageSQL = `
CREATE TABLE IF NOT EXISTS storage_name (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  storage_name VARCHAR ( 255 ),
);

INSERT INTO storage (storage_name) 
VALUES
  ('Fridge'),
  ('Left Cupboard);
`;

const storageItemsSQL = `
CREATE TABLE IF NOT EXISTS storage_items (
  storage_id INTEGER REFERENCES storage(id), item_id INTEGER REFERENCES item(id),
  quantity_total INTEGER CHECK(quantity_total>=0), quantity_left INTEGER CHECK (quantity_left>=0),
PRIMARY KEY (storage_id,item_id);
);

INSERT INTO storage_items (storage_id, item_id, quantity_left,quantity_total) 
VALUES
  (1,1,250,150),
  (2,2,8,4);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // connectionString: `postgresql://${process.env.USER}:${process.env.PGPASSWORD}@localhost:5432/top_messages`,
    connectionString: `postgresql://postgres:${process.env.PGPASSWORD}@junction.proxy.rlwy.net:38370/railway
`,
  });
  await client.connect();
  await client.query(itemSQL);
  await client.query(storageSQL);
  await client.query(storageItemsSQL);
  await client.end();
  console.log("done");
}

main();
