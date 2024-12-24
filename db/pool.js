#! /usr/bin/env node
require("dotenv").config();

const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: `${process.env.CONNECTIONSTRING}`,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

exports.query = query;
