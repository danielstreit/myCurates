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
  keywords: {
    type: String,
    default: ''
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

// Validate that collection url is unique
CollectionSchema
  .path('url')
  .validate(function(value, respond) {
    var context = this;
    this.constructor.findOne({url: value}, function(err, collection) {
      if (err) throw err;
      if (collection) {
        if (context.id === collection.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
  }, 'This url is already in use, please choose another');

  CollectionSchema
    .path('url')
    .validate(function(value, respond) {
      return respond(value.match(/^[a-zA-Z0-9_-]*$/));
    }, 'Invalid url characters, use only letters, numbers, -, and _')

module.exports = mongoose.model('Collection', CollectionSchema);