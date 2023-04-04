const boom = require('@hapi/boom');
// array base para trabajar las categorias
const productosBase  = [
  { id: 1, category: 'Telephone'},
  { id: 2, category: 'Desktop'},
]

class CategoriesService {
  // constructor() {}

  // create() {}


  search(categoryId) {
    //
    // const prods = servicioProductos.filter(item => item.category === categoryId);
    const prods = [];
    return prods;
  }

  findOne(categoryId, productId) {
    //
    // const prod = servicioProductos.filter(item => item.category === categoryId && item.id === Number(productId));
    const prod = [];
    return prod;
  }

  update(id, category) {
    const prodIndex = productosBase.findIndex(item => item.id === id);
    if (prodIndex === -1) {
      throw boom.notFound('Articulo no encontrado!');
    }

    const prod = productosBase[id];
    productosBase[id] = {
      ...prod,
      ...category,
    }
  }

  delete(category) {
    // Valido si la categoria no contiene a ningun producto. Si tiene alguno rechazo el borrado
    const resto = productosBase.findIndex(item => item.category === category);

    if (resto >= 0) {
      throw boom.conflict('No se puede Borrar la Categoria porque aun quedan elementos asociados a ella');
    }

    // Borrado de categoria
  }
}

module.exports = CategoriesService;
