'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
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
  "_id" : "551072458e97142166a71900",
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
    });
  });

  it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
});

describe('User Model with populated database', function() {
  beforeEach(function(done) {
    User.create(teacher, function(err, user) {
      console.log("Adding user to database");
      if (err) console.log("Error in User.create!");
      User.findOne({name: "Maryann Emerson"}, function(err, user) {
        if (err) console.log("Error in adding!");
        console.log("Added to database: " + user.name);
        done();
      });
    });
  });

  afterEach(function(done) {
    User.remove({}, function(err, something) {
      console.log("Clearing database");
      User.find({}, function(err, users) {
        console.log("Things in database: " + users.length);
        done();
      });
    });
  });

  it('should be one teacher in database', function(done) {
    User.find({}, function(err, users) {
      console.log("Here's our first Teacher");
      console.log(users[0]);
      done();
    });
  });

  it('should be one teacher in database again', function(done) {
    User.find({}, function(err, users) {
      console.log("Here's our second Teacher");
      console.log(users[0]);
      done();
    });
  });

  it('should be able to add student group', function(done) {
    User.find({}, function(err, users) {
      console.log("Here's our second Teacher");
      console.log(users[0]);
      users[0].addStudentGroup()
      done();
    });
  });

  //it('should return all of a teachers students', function(done) {
  //  User.find({}, function(err, users) {
  //    console.log("HERES OUR TEACH");
  //    console.log(users[0]);
  //    //if (err) console.log("AHHHHH Error");
  //    //else {
  //    //  console.log("Here's our teacher: " + user.json());
  //    //};
  //    done();
  //  });
  //});

});
