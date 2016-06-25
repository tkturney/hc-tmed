'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/helpcard2-dev'
  },

  // Postgres connection options
  postgres: {
    uri: process.env.POSTGRES_URL ||
         'postgres://user:pass@localhost:5432/helpcard2'
  },
  database: 'HelpCard',
  // Local connection
  username: 'helpcard',
  password: 'helpcard',
  // Remote connection
  // username: 'tkturney',
  // password: 'c0nn0rd0g',
  seedDB: true
};
