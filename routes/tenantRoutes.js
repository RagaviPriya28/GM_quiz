// const express = require('express');
// const router = express.Router();
// const tenantController = require('../controllers/tenantController');

// // Route definitions
// router.post('/tenants', tenantController.createTenant);
// router.get('/tenants', tenantController.getAllTenants);
// router.get('/tenants/:id', tenantController.getTenantById);
// router.put('/tenants/:id', tenantController.updateTenant);
// router.delete('/tenants/:id', tenantController.deleteTenant);

// module.exports = router;


const express = require('express');
const { createTenant, getAllTenants, getTenantById, updateTenant, deleteTenant } = require('../controllers/tenantController');
const { auth, isAdmin } = require('../middlewares/auth');

const router = express.Router();

// Tenant Management Routes
router.post('/', auth, isAdmin, createTenant);         
router.get('/', auth, isAdmin, getAllTenants);        
router.get('/:id', auth, isAdmin, getTenantById);      
router.put('/:id', auth, isAdmin, updateTenant);       
router.delete('/:id', auth, isAdmin, deleteTenant);    

module.exports = router;
