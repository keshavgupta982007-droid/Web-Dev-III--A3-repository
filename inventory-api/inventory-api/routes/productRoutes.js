const express = require('express');
const ctrl = require('../controllers/productController');
const { validateObjectId, requireBody, validateStockChange } = require('../middleware/validate');

const router = express.Router();

router.route('/').get(ctrl.getProducts).post(requireBody, ctrl.createProduct);

// Static routes must be declared before "/:id"
router.get('/low-stock', ctrl.getLowStock);
router.get('/summary', ctrl.getSummary);

router.patch('/:id/stock', validateObjectId, validateStockChange, ctrl.adjustStock);

router
  .route('/:id')
  .get(validateObjectId, ctrl.getProductById)
  .put(validateObjectId, requireBody, ctrl.updateProduct)
  .delete(validateObjectId, ctrl.deleteProduct);

module.exports = router;
