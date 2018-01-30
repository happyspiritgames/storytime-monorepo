const express = require('express');
const adminController = require('./adminController');

const router = express.Router();

router.use((req, res, next) => {
  console.log('using admin router - must be logged in and have admin role');
  next();
});

router.get('/players')
.get(adminController.getPlayers);

module.exports = adminController;
