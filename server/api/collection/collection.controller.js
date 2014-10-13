'use strict';

var _ = require('lodash');
var Collection = require('./collection.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

// Get list of collections
exports.index = function(req, res) {
  Collection.find(function (err, collections) {
    if(err) { return handleError(res, err); }
    return res.json(200, collections);
  });
};

// Get a single collection
exports.show = function(req, res) {
  Collection.findOne({ url: req.params.url }, function (err, collection) {
    if (err) { return handleError(res, err); }
    // if no collection found, treat it as a look up for a user's collections
    if (!collection) {
      Collection.find({ 'user._id': req.params.url }, function(err, collections) {
        if (err) {
          return handleError(res, err);
        }
        if (!collections) {
          return res.send(404);
        }
        return res.json(200, collections);
      });
    } else {
      return res.json(collection);
    }
  });
};

// Creates a new collection in the DB.
exports.create = function(req, res) {
  Collection.create(req.body, function(err, collection) {
    if(err) { return validationError(res, err); }
    return res.json(201, collection);
  });
};

// Updates an existing collection in the DB.
exports.update = function(req, res) {
  var update = req.body;
  delete update._id;
  delete update.userStars;
  update.updatedAt = Date.now();
  Collection.findByIdAndUpdate(req.params.id, update, function(err, collection) {
    if (err) {
      console.error(err);
      return handleError(res, err);
    }
    return res.json(200, collection);
  });
};

// Adds a star to the collection
exports.addStar = function(req, res) {
  var collectionId = req.params.collectionId;
  var userId = req.params.userId;
  console.log(collectionId, userId);
  Collection.findByIdAndUpdate(collectionId, {
    $addToSet: {
      userStars: userId
    }
  }, function(err, collection) {
    if (err) {
      console.error(err);
      return handleError(res, err);
    }
    console.log('after add star:', collection);
    return res.json(200, collection);
  });
};

// Removes a star to the collection
exports.removeStar = function(req, res) {
  var collectionId = req.params.collectionId;
  var userId = req.params.userId;
  console.log(collectionId, userId);
  Collection.findByIdAndUpdate(collectionId, {
    $pull: {
      userStars: userId
    }
  }, function(err, collection) {
    if (err) {
      console.error(err);
      return handleError(res, err);
    }
    console.log('after remove star:', collection);
    return res.json(200, collection);
  });
};

// Deletes a collection from the DB.
exports.destroy = function(req, res) {
  Collection.findById(req.params.id, function (err, collection) {
    if(err) { return handleError(res, err); }
    if(!collection) { return res.send(404); }
    collection.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.error(err);
  return res.send(500, err);
}