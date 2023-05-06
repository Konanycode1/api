const express = require('express');
const router = express.Router();
const Thing = require("../models/thing");
const controller = require('../controllers/stuff')
const auth =require('../middleware/auth')
const multer = require('../middleware/multer')


router.post("/create/",auth,controller.createThing );
router.get("/add/:id",auth,multer,controller.addId);
router.put("/update/:id",auth,multer,controller.updateThing);
router.delete("/delete/:id",auth,controller.deleteThing );
router.get("/all",auth,controller.addAll);

module.exports = router