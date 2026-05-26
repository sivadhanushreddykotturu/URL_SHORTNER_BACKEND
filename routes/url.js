const express = require("express");
const {generateShortId, redirectURL, analyticsURL} = require("../controllers/url");
const router = express.Router();


router.post("/",generateShortId);
router.get("/:shortId",redirectURL);
router.get("/analytics/:shortId",analyticsURL);

module.exports = router