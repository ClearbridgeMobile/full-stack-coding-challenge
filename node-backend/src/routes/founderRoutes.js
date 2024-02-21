const express = require('express');
const router = express.Router();
const founderHandlers = require('../handlers/founderHandlers');

router.get('/companies/founders/:id', founderHandlers.getAllFoundersByCompanyId);
router.post('/companies/add-founders/:id', founderHandlers.addFounderToCompany);

module.exports = router;
