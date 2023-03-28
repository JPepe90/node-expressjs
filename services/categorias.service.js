class CategoriesService {
  // constructor() {}

  // create() {}
  search(categoryId) {
    const prods = servicioProductos.filter(item => item.category === categoryId);
    return prods;
  }

  findOne(categoryId, productId) {
    const prod = servicioProductos.filter(item => item.category === categoryId && item.id === Number(productId));
    return prod;
  }

  update() {}
  delete() {}
}

module.exports = CategoriesService;
