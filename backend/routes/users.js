/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUsersId, getUsersMe, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
}), getUsers);

router.get('/users/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
}), getUsersMe);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
}), getUsersId);

router.patch('/users/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/),
  }),
}), updateAvatar);

module.exports = router;
