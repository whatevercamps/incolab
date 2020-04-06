const bcrypt = require('bcryptjs');


module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = (email, callback) => {
  const query = {
    email: email
  };
  User.findOne(query, callback);
};

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, callback);
};
