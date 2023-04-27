const joi = require('joi');

const id = joi.number();
const name = joi.string().min(3).max(60);
const price = joi.number().integer().min(1);
const image = joi.string().uri();
const categoryId = joi.number().integer();
const description = joi.string().min(3);
const isBlock = joi.boolean();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  description: description,
  isBlock: isBlock.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
