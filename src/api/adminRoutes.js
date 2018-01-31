const express = require('express');
const adminController = require('./adminController');

const router = express.Router();

router.all('*', (req, res, next) => {
  console.log('Invoking admin API');
  if (!req.user || !req.user.roles || !req.user.roles.find((item) => item === 'admin')) {
    console.log('User is not logged in or does not have admin role.');
    res.status(401);
    next('Unauthorized access');
  }
  next();
});

router.get('/players', adminController.getPlayers);
router.get('/players/:playerId', adminController.getPlayer);
router.put('/players/:playerId/suspend', adminController.suspendPlayer);
router.put('/players/:playerId/activate', adminController.activatePlayer);
router.put('/players/:playerId/delete', adminController.deletePlayer);

module.exports = router;
