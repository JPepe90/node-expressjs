const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(30);
const price = joi.number().integer().min(1);
const image = joi.string().uri();
const category = joi.string();
const isBlock = joi.boolean();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  category: category.required(),
  isBlock: isBlock.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image,
  category: category,
  isBlock: isBlock,
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
