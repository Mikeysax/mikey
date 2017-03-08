import fs from 'fs';
import path from 'path';
import Waterline from 'waterline';
import pgAdapter from 'sails-postgresql';

let orm = new Waterline();
let config = '';

if (__DEVELOPMENT__) {
  config = {
    adapters: {
      postgresql: pgAdapter
    },
    connections: {
      myPostgres: {
        adapter: 'postgresql',
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'database_qelody',
        poolSize: 10
      }
    }
  };
} else {
  // For Heroku
  config = {
    adapters: {
      postgresql: pgAdapter
    },
    connections: {
      myPostgres: {
        adapter: 'postgresql',
        url: process.env.DATABASE_URL,
        poolSize: 10,
        ssl: true
      }
    },
    defaults: {
      migrate: 'safe'
    }
  };
}


fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file));
    orm.loadCollection(model);
  });

module.exports = { waterline: orm, config: config };
