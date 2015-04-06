'use strict';

var express = require('express');
var controller = require('./student.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/updateBucket', auth.isAuthenticated(), controller.updateBucket);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
