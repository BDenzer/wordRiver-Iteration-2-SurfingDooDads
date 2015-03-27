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
  "_id" : "551072458e97142166a71900",
  studentList: [
    "551072458e97142166a71951"
   // "551072458e97142166a71952",
   // "551072458e97142166a71954"
  ]
});

var teacher2 = new User({
  provider: 'local',
  name: 'TMaryann Emerson',
  email: 'Tmaryannemerson@puria.com',
  password: 'Tdeserunt',
  "_id" : "1551072458e97142166a7190",
  studentList: [
    "151072458e97142166a71951"
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

//var counter;
//counter = 0;
describe('User Model with populated database', function() {
  beforeEach(function(done) {
    //if (counter === 0) {
    //  teacher.save();
    //}
    //if (counter === 1) {
    //  teacher2.save();
    //}
    //user.save(function() {
    //  var userDup = new User(user);
    //  userDup.save(function(err) {
    //    should.exist(err);
    //    done();
    //  });
    //});
    User.create(teacher, function(err, user) {
      console.log("Adding user to database");
      if (err) console.log("Error in User.create!");
      User.find({}, function(err, users) {
        if (err) console.log("Error in adding!");
        console.log("Things in database: " + users.length);
        done();
      });
    });
    //teacher.save(function() { // Try taking out callback when working
    //  console.log("Added teacher to database.");
    //  User.find({}, function(err, users) {
    //    if (err) console.log("Error in adding!");
    //    console.log("Things in database: " + users.length);
    //    //done();
    //  });
    //  //done();
    //});
    //console.log("outside save callback");
    //done();


    //student1.save();
    //console.log("Added teacher to database.");
    //counter += 1;
    //done();
  });

  afterEach(function(done) {
    // Clears the User database
    //User.remove().exec().then(function() {
    //  console.log("Database cleared");
    //  done();
    //});
    //console.log("outside clear callback");
    User.remove({}, function(err, something) {
      console.log("Clearing database");
      User.find({}, function(err, users) {
        console.log("Things in database: " + users.length);
        done();
      });
    });
    //done();
  });

  it('should be one teacher in database', function(done) {
    User.find({}, function(err, users) {
      console.log("HEREs first Teacher");
      console.log(users[0]);
      //users.should.have.length(1);
      done();
    });
    //console.log("outside first teacher callback");
    //done();
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

  it('should be one teacher in databasePART2', function(done) {
    User.find({}, function(err, users) {
      console.log("HEREs second Teacher");
      console.log(users[0]);
      //users.should.have.length(1);
      done();
    });
    //console.log("outside 2nd teacher callback");
    //done();
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
    //var ourTeacher;
    //ourTeacher = User.find({name: 'Maryann Emerson'}).name;
    //console.log("Here's our teacher " + ourTeacher);
    //User.find({name: 'Maryann Emerson'}, function (err, user) {
    //  //user.tileTags.push({"tagName": tagName, "packType": packType});
    //  //user.save(function(err) {
    //  //  if (err) return validationError(res, err);
    //  //  res.send(200);
    //  //});
    //
    //  console.log("Hello!");
    //  console.log(user);
    //});
    //console.log(ourTeacher);
    //User.find({}, function(err, users) {
    //  users.should.have.length(1);
    //  done();
    //});
    //done();
  //
  //it('should return all of a teachers students', function(done) {
  //  var ourTeacher;
  //  ourTeacher = User.find({name: 'Maryann Emerson'});
  //  should.equal(UserCCC.getUserStudents(ourTeacher), "Lizard");
  //  done();
  //});

});
