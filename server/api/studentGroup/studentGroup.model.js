/**
 * Created by lemmo031 on 4/2/15.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentGroupSchema = new Schema({
  groupName: String,
  students: [Schema.ObjectId]

});
