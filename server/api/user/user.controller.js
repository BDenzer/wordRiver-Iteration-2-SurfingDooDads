'use strict';

var User = require('./user.model');
var Student = require('../student/student.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.getUserStudents = function(user) {

 //for(var i = 0; i < user.studentList.length; i++){
   var studentId;
   studentId = user.studentList[0];
   return Student.findById(studentId).firstName;
 //};
 // return "Lizard";
};

exports.updatePack = function(req, res, next) {
  var userId = req.user._id;

  var tagName = req.body.tagName;
  var packType = req.body.packType;

  User.findById(userId, function (err, user) {
      user.tileTags.push({"tagName": tagName, "packType": packType});
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
  });
};

exports.updateGroup = function(req, res, next) {
  var userId = req.user._id;

  var groupName = req.body.groupName;
  //var packType = req.body.packType;

  User.findById(userId, function (err, user) {
    user.studentGroups.push({"groupName": groupName});
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.updateStudents = function(req, res, next) {
  var userId = req.user._id;

  var groupIndex = req.body.groupIndex;
  var student = req.body.student;
  //var packType = req.body.packType;

  User.findById(userId, function (err, user) {
    user.studentGroups[groupIndex].students.push(student);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.updateTile = function(req, res, next) {
  var userId = req.user._id;

  var word = req.body.word;
  var packId = req.body.packId;

  User.findById(userId, function (err, user) {
    var found = false;
    for(var i = 0; i < user.tileBucket.length; i++){
      if(user.tileBucket[i].wordName == word){
        found = true;
        user.tileBucket[i].tileTags.push(packId);
      }
    }
    if(!found){
      user.tileBucket.push({wordName: word, tileTags: [packId]});
    }
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.addWord = function(req, res, next) {
  var userId = req.user._id;

  var word = req.body.word;

  User.findById(userId, function (err, user) {
    user.tileBucket.push({wordName: word, tileTags: []});
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.deletePack = function(req, res, next) {
  var userId = req.user._id;

  var index = req.body.index;
  User.findById(userId, function (err, user) {
    for(var i = 0; i < user.tileBucket.length; i++){
      for(var j = 0; j < user.tileBucket[i].tileTags.length; j++){
        if(user.tileBucket[i].tileTags[j] == user.tileTags[index]){
          user.tileBucket[i].tileTags.splice(j, 1);
        }
      }
    }
    user.tileTags.splice(index, 1);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.deleteGroup = function(req, res, next) {
  var userId = req.user._id;

  var index = req.body.index;
  User.findById(userId, function (err, user) {
    user.studentGroups.splice(index, 1);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.addStudentGroup = function(req, res, next) {
  var userId = req.user._id;

  var group = req.body.group;
  User.findById(userId, function (err, user) {
    user.studentGroups.push(group);
    user.markModified('studentGroups');
    user.save().exec();
  });
}

exports.deleteTile = function(req, res, next) {
  var userId = req.user._id;

  var word = req.body.word;
  var packId = req.body.packId;
  User.findById(userId, function (err, user) {
    for(var i = 0; i < user.tileBucket.length; i++){
      console.log(word == user.tileBucket[i].wordName);
      if(word == user.tileBucket[i].wordName){
        console.log(word);
        for(var j = 0; j < user.tileBucket[i].tileTags.length; j++){
          if(user.tileBucket[i].tileTags[j] == packId){
            console.log(j);
            user.tileBucket[i].tileTags.splice(j, 1);
          }
        }
      }
    }
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.deleteStudent = function(req, res, next) {
  var userId = req.user._id;

  var studentId = req.body.studentId;
  var groupId = req.body.groupId;
  User.findById(userId, function (err, user) {
    for(var i = 0; i < user.studentGroups[groupId].students.length; i++){
      console.log(studentId + " + " + user.studentGroups[groupId].students[i])
      if(studentId == user.studentGroups[groupId].students[i]){
        user.studentGroups[groupId].students.splice(i,1);
        console.log("test")
      }
    }
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.updateBucket = function(req, res, next) {
  var userId = req.user._id;
  var word = req.body.word;
  //var updates = req.body.user;

  User.findById(userId, function (err, user) {
     user.tileBucket.push({wordName: word, tileTags: []});
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
  });
};


exports.postMe = function(req, res, next) {
  var userId = req.user._id;

  var word = req.body.words;

  User.findById(userId, function (err, user) {
    user.words.push({"words": word}); // Use tileBucket for this -Lemmon
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};


exports.destroyMe = function(req, res, next) {
  var userId = req.user._id;

  var word = req.body.words; // Use tileBucket for this too -Lemmon
  console.log("i got here")

    User.findById(userId, function (err, user) {
      if(err) { return handleError(res, err); }
      for(var n = 0; n < user.words.length; n++){
        if(user.words[n] == word){
          user.words.splice(0,n);
        }
      }
      if(!user.words) { return res.send(404); }
      user.words.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.send(204);
      });
    });
  };
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
