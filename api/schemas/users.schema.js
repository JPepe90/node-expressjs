const joi = require('joi');

const uid = joi.string().uuid();
const username = joi.string().min(3).max(15);
const email = joi.string().email();
const image = joi.string().uri();
const isBlock = joi.boolean();

const createUserSchema = joi.object({
  username: username.required(),
  email: email.required(),
  image: image,
  isBlock: isBlock
});

const updateUserSchema = joi.object({
  username: username,
  email: email,
  image: image,
  isBlock: isBlock
});

const getUserSchema = joi.object({
  uid: uid.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
