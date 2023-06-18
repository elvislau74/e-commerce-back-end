// Calling all required dependencies and files 
const router = require('express').Router();
const apiRoutes = require('./api');

// Uses the api folder for modular routing of server
router.use('/api', apiRoutes);

// Message for incorrect page/route
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Exports router
module.exports = router;