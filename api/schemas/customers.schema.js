const joi = require('joi');

const id = joi.number();
const name = joi.string().min(1).max(35);
const surname = joi.string().min(1).max(35);
const country = joi.string().max(30);
const uid = joi.number().integer();
const createdAt = joi.date();

const username = joi.string().min(3);
const email = joi.string().email();
const password = joi.string().min(6);
const role = joi.string();
const isBlock = joi.boolean();

const createCustomerSchema = joi.object({
  name: name.required(),
  surname: surname.required(),
  country: country,
  uid: uid,
  user: joi.object({
    username: username,
    email: email,
    password: password,
    role: role,
    isBlock: isBlock,
  }),
  createdAt: createdAt,
});

const updateCustomerSchema = joi.object({
  name: name,
  surname: surname,
  country: country,
  uid: uid
});

const getCustomerSchema = joi.object({
  id: id.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
