'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user: {
    type: {
      name: String,
      _id: String
    },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  links: [{
    url: String,
    title: String,
    description: String
  }],
  userStars: {
    type: [],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Collection', CollectionSchema);