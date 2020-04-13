const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const ModelGenerator = require("../models/user");
const model = ModelGenerator();

module.exports = function (passport) {
  const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
      token = req.cookies["jwt"];
    }
    console.log("token", token);
    return token || ExtractJwt.fromAuthHeaderWithScheme("jwt");
  };

  let opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = process.env.SECRET || "";
  console.log("llego al middleware");
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
