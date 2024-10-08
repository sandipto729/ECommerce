const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  productSellingPrice: {
    type: String,
    required: true,
  },
  productPhotos: {
    type: Array,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('product', productSchema);
