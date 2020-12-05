/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
// stop server: killall node
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');

const app = express();

app.use(cors());

const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/),
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use(errors());
app.use(errorLogger);

app.all('*', (req, res) => { throw new NotFoundError('Запрашиваемый ресурс не найден'); });

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  console.log(message);
  console.log(statusCode);

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Вы переедали неверные данные';
  }

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Не найден';
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 409;
    message = 'Пользователь с таким email уже зарегестрирован';
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
