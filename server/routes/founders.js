const express = require('express');
const router = express.Router();
const foundersController = require('../controllers/foundersController');

router.post('/', foundersController.addFounder);
router.get('/', foundersController.getFoundersByCompanyId);

module.exports = router;
