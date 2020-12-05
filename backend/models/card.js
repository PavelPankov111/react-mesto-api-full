/* eslint-disable no-useless-escape */
const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url),
      message: (props) => `${props.value} - некорректный url`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },

  likes: [{
    type: Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
