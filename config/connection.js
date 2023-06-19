// Call/import dependencies: dotenv and sequelize
require('dotenv').config();
const Sequelize = require('sequelize');

// Create a connection object to connect to database with mysql
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// export sequelize
module.exports = sequelize;
