const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');

router.get('/', companiesController.getAllCompanies);
router.post('/', companiesController.createCompany);
router.get('/:id', companiesController.getCompanyById);
router.put('/:id', companiesController.updateCompany);
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;
