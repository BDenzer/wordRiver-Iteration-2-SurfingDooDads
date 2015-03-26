'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var UserCCC = require('./user.controller');
var Student = require('../student/student.model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var teacher = new User({
  provider: 'local',
  name: 'Maryann Emerson',
  email: 'maryannemerson@puria.com',
  password: 'deserunt',
  studentList: [
    "551072458e97142166a71951"
   // "551072458e97142166a71952",
   // "551072458e97142166a71954"
  ]
});

var student1 = new Student({
  "firstName": "Lizard",
  "lastName": "Pratt",
  "_id" : "551072458e97142166a71951"
});

var student2 = new Student({
  "firstName": "Battle",
  "lastName": "Whitaker",
  "_id" : "551072458e97142166a71952"
});

var student3 = new Student({
  "firstName": "Leanna",
  "lastName": "Garrison",
  "_id" : "551072458e97142166a71953"
});

var student4 = new Student({
  "firstName": "Sherman",
  "lastName": "Foster",
  "_id" : "551072458e97142166a71955"
});

var student5 = new Student({
  "firstName": "Cassie",
  "lastName": "Ramos",
  "_id" : "551072458e97142166a71954"
});

describe('User Model on empty database', function() {
  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });5
  });

  it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
});

describe('User Model with populated database', function() {
  before(function(done) {
    teacher.save();
    student1.save();
    done();
  });

  afterEach(function(done) {
    // Clears the User database
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should be one teacher in database', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(1);
      done();
    });
  });

  //it('teacher should have a student', function(done) {
  //  var ourTeacher = User.find({name: 'Maryann Emerson'});
  //  console.log(ourTeacher);
  //  //User.find({}, function(err, users) {
  //  //  users.should.have.length(1);
  //  //  done();
  //  //});
  //  done();
  //});

  it('should return all of a teachers students', function(done) {
    //User.find({name: 'Maryann Emerson'}, function(err, user) {
    //  console.log(user);
    //}).lean();
    //var ourTeacher;
    //ourTeacher = User.findbyId({name: 'Maryann Emerson'}).lean();
    User.find({name: 'Maryann Emerson'}, function (err, user) {
      //user.tileTags.push({"tagName": tagName, "packType": packType});
      //user.save(function(err) {
      //  if (err) return validationError(res, err);
      //  res.send(200);
      //});

      console.log("Hello!");
      console.log(user);
    });
    //console.log(ourTeacher);
    //User.find({}, function(err, users) {
    //  users.should.have.length(1);
    //  done();
    //});
    done();
  });
  //
  //it('should return all of a teachers students', function(done) {
  //  var ourTeacher;
  //  ourTeacher = User.find({name: 'Maryann Emerson'});
  //  should.equal(UserCCC.getUserStudents(ourTeacher), "Lizard");
  //  done();
  //});

});
