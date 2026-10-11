const mongoose = require('mongoose');
const { ApiError } = require('./errorHandler');

// Rejects malformed ObjectIds before they hit the database
const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ApiError(400, `Invalid product id: ${req.params.id}`));
  }
  next();
};

// Ensures a JSON body exists for write operations
const requireBody = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Request body cannot be empty'));
  }
  next();
};

// Validates the body of PATCH /:id/stock
const validateStockChange = (req, res, next) => {
  const { change } = req.body || {};
  if (typeof change !== 'number' || !Number.isInteger(change) || change === 0) {
    return next(new ApiError(400, '"change" must be a non-zero integer (positive to restock, negative for a sale)'));
  }
  next();
};

module.exports = { validateObjectId, requireBody, validateStockChange };
