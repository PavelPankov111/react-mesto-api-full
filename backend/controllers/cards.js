/* eslint-disable semi */
/* eslint-disable consistent-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
}

module.exports.postCards = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCards = (req, res, next) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Карточки с таким id - не существует!' });
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findOneAndUpdate(
    { _id: req.params._id },
    { $addToSet: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};
