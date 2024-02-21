const express = require('express');
const router = express.Router();
const companyHandlers = require('../handlers/companyHandlers');

router.get('/companies', companyHandlers.getAllCompanies);
router.post('/companies/add', companyHandlers.createCompany);

module.exports = router;
