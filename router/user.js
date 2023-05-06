const express = require('express');
const router= express.Router();
const controller = require("../controllers/user")

router.post("/signup", controller.signup);
router.get("/login/", controller.login);
router.get("/user/",controller.user);
router.get("/user/:id", controller.userId); 

module.exports = router;