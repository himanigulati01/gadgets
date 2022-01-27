let { Router } = require("express");
let router = Router();
let { register_user, login_user } = require("./userServices");

router.post("/signUp", register_user);
router.post("/login", login_user);
module.exports = router;
