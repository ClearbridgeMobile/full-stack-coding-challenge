const express = require('express');
const router = express.Router();
const companyHandlers = require('../handlers/companyHandlers');

router.get('/companies', companyHandlers.getAllCompanies);
router.get('/companies/:id', companyHandlers.getCompanyById);
router.post('/companies/add', companyHandlers.createCompany);
router.put('/companies/update/:id', companyHandlers.updateCompany);
router.delete('/companies/delete/:id', companyHandlers.deleteCompany);

module.exports = router;
