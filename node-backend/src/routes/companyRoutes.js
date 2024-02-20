const express = require('express');
const router = express.Router();
const companyHandlers = require('../handlers/companyHandlers');

router.get('/companies', companyHandlers.getAllCompanies);

module.exports = router;
