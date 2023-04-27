const joi = require('joi');

const id = joi.number().integer();
const cid = joi.number().integer();
const pid = joi.number().integer();
const oid = joi.number().integer();
const amount = joi.number().integer().min(1);

const createOrderSchema = joi.object({
  cid: cid.required(),
  pid: pid,
});

const updateOrderSchema = joi.object({
  cid: cid,
  pid: pid,
});

const getOrderSchema = joi.object({
  id: id.required()
});

const addItemSchema = joi.object({
  oid: oid.required(),
  pid: pid.required(),
  amount: amount.required()
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema };
