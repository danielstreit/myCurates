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
    required: true,
    lowercase: true
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

// Ensure index on url
CollectionSchema.index({ url: 1 });

CollectionSchema.set()

// Validate that collection url is unique
CollectionSchema
  .path('url')
  .validate(function(value, respond) {
    this.constructor.findOne({url: value}, function(err, collection) {
      if (err) throw err;
      if (collection) {
        return respond(false);
      }
      return respond(true);
    })
  }, 'This url is already in use, please choose another');

module.exports = mongoose.model('Collection', CollectionSchema);