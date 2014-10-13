'use strict';

var express = require('express');
var controller = require('./collection.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:url', controller.show); // First look up a collection url, then look up collections by user id
router.get('/:collectionId/addStar/:userId', controller.addStar);
router.get('/:collectionId/removeStar/:userId', controller.removeStar);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;