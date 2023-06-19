const express = require('express');
const routes = require('./routes');
// import sequelize connection and other dependencies

// call express
const app = express();
const PORT = process.env.PORT || 3001;

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
