const express = require('express');
const router = express.Router();
const foundersController = require('../controllers/foundersController');

router.post('/:id', foundersController.addFounder);
router.get('/:id', foundersController.getFoundersByCompanyId);

module.exports = router;
