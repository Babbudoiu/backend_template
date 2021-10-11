const User = require("../users/user.model");
const jwt = require("jsonwebtoken");
const expressJwt =  require("express-jwt");

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['RS256'],
  userProperty: "auth",
});

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
};

