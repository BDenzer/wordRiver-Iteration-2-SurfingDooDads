'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  tileBucket: [Schema.ObjectId],
  //"gender": String,
  //"grade": String,
  "_id" : Schema.ObjectId

});

module.exports = mongoose.model('Student', StudentSchema);
