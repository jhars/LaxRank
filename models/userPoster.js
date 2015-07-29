// require mongoose and other modules
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);
 	//myLeaguePoster Here
//++++++WORKNG ROUTE(s)++++++++//
 var UserPosterSchema = new Schema({
 	userName: String,
 	email: String,
 	passwordDigest: String
 	// myLeague: [MyLeague.schema]
 });/////////FIX THIS LATER///////////

 // create a new user with secure (hashed) password
UserPosterSchema.statics.createSecure = function (userData, callback) {
  // `this` references our schema
  // store it in variable `that` because `this` changes context in nested callbacks
  console.log(userData + 'userDattttta');
  var that = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(userData.password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      that.create({
        userName: userData.userName,
        email: userData.email,
        passwordDigest: hash
      }, callback);
    });
  });
};




// authenticate user (when user logs in)
UserPosterSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (user === null) {
      console.log('no user found!!');
    // if found user, check if password is correct
    } else {
    user.checkPassword(password);
      callback(null, user);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
UserPosterSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

// create and export User model
var UserPoster = mongoose.model('UserPoster', UserPosterSchema);
module.exports = UserPoster;