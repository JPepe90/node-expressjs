const joi = require('joi');

const uid = joi.number();
const username = joi.string().min(3).max(15);
const email = joi.string().email();
const password = joi.string();
const image = joi.string().uri();
const isBlock = joi.boolean();
const role = joi.string().min(5);
const createAt = joi.date();

const createUserSchema = joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
  image: image,
  isBlock: isBlock,
  role: role.required(),
  createAt: createAt
});

const updateUserSchema = joi.object({
  username: username,
  email: email,
  password: password,
  image: image,
  isBlock: isBlock,
  role: role,
  createAt: createAt
});

const getUserSchema = joi.object({
  uid: uid,
  email: email,
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
