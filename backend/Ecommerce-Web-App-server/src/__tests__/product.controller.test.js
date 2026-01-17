// instead of import
const { addProduct, allProducts, deleteProduct } = require('../controller/product.controller.js');

describe('Product Controller basic tests', () => {
  it('should have addProduct defined', () => {
    expect(addProduct).toBeDefined();
  });

  it('should have allProducts defined', () => {
    expect(allProducts).toBeDefined();
  });

  it('should have deleteProduct defined', () => {
    expect(deleteProduct).toBeDefined();
  });
});
