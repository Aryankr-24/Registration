const router = require("express").Router();

const{ enroll } = require("../controllers/user");

router.route("/enroll").post(enroll);

module.exports = router;