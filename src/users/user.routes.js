const express = require("express");
const userCtrl = require("./user.controllers");
const authCtrl = require("../auth/auth.controllers");

const router = express.Router();

router.
route("/api/users").
get(userCtrl.list).
post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userByID);

module.exports =  router;
