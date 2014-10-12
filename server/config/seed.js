/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Collection = require('../api/collection/collection.model');
var user;

User
  .remove({})
  .exec()
  .then(function() {
    return User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    });
  })
  .then(function(u) {
    user = {
      name: u.name,
      _id: u._id
    };
    return Collection.remove({}).exec();
  })
  .then(function() {
    return Collection.create({
      title: 'Test',
      url: 'test',
      user: user,
      description: 'This is a test. It is only a test',
      links: [
        {
          url: 'http://www.google.com',
          title: 'Google',
          description: 'Testing a link'
        },
        {
          url: 'http://www.duck.com',
          title: 'Duck.com',
          description: 'Another link test'
        }
      ],
      userStars: [user._id.toString()]
    });
  })
  .then(function(collection) {
    console.log(collection);
  })
  .then(null, function(err) {
    console.error(err);
  });
