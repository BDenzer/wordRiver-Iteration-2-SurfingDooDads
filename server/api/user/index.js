'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.delete('/me', auth.isAuthenticated(), controller.destroyMe);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/updatePack', auth.isAuthenticated(), controller.updatePack);
router.put('/:id/updateTile', auth.isAuthenticated(), controller.updateTile);
router.put('/:id/deleteTile', auth.isAuthenticated(), controller.deleteTile);
router.put('/:id/deletePack', auth.isAuthenticated(), controller.deletePack);
router.put('/:id/updateBucket', auth.isAuthenticated(), controller.updateBucket);
router.put('/:id/updateGroup', auth.isAuthenticated(), controller.updateGroup);
router.put('/:id/updateStudents', auth.isAuthenticated(), controller.updateStudents);
router.put('/:id/deleteGroup', auth.isAuthenticated(), controller.deleteGroup);
router.put('/:id/deleteStudent', auth.isAuthenticated(), controller.deleteStudent);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/me', auth.isAuthenticated(), controller.postMe);

module.exports = router;
