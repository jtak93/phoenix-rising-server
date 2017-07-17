var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username             : { type: String, unique: true, sparse: true },
  email                : { type: String, unique: true },
  settings             : { type: Object },
  stats                : { type: Object },
  resetPasswordToken   : { type: String },
  resetPasswordExpires : { type: Date }
}, {autoIndex: false})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
