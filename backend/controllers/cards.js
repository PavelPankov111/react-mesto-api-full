/* eslint-disable semi */
/* eslint-disable consistent-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch(next);
}

module.exports.postCards = async (req, res, next) => {
  // const { name, link } = req.body;
  // Card.create({ name, link, owner: req.user._id })
  // .then((card) => {
  //   card.owner = { _id: req.user._id };
  //   return res.status(200).send(card)
  // })
  // .catch(next)
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.findById(card._id)
      .populate(['owner', 'likes'])
      .then((newCard) => newCard))
    .then((newCard) => res.status(200).send(newCard))
    .catch(next);
};

module.exports.deleteCards = (req, res, next) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Карточки с таким id не существует!' });
      }
      const owner = String(card.owner)
      const userId = String(req.user._id)
      if (owner !== userId) {
        return res.status(403).send({ message: 'Вы не можеет удалять чужие карточки' });
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
