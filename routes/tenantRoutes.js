const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// Route definitions
router.post('/tenants', tenantController.createTenant);
router.get('/tenants', tenantController.getAllTenants);
router.get('/tenants/:id', tenantController.getTenantById);
router.put('/tenants/:id', tenantController.updateTenant);
router.delete('/tenants/:id', tenantController.deleteTenant);

module.exports = router;
