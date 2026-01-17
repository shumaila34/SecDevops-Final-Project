import { addProduct, allProducts, deleteProduct } from '../controller/product.controller.js';

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
