const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const ModelGenerator = require("../models/user");
const model = ModelGenerator();

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.SECRET || "";
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      model
        .connect()
        .then((client) => model.getUserById(client, jwt_payload._id))
        .then((users) => {
          if (users && users.length) {
            return done(null, users[0]);
          } else {
            return done(null, false);
          }
        });
    })
  );
};
