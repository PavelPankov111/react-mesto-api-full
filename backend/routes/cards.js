/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, postCards, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
}), getCards);

router.post('/cards', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/),
  }),
}), postCards);

router.delete('/cards/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCards);

router.put('/cards/:_id/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/cards/:_id/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(100),
  }).unknown(true),
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
