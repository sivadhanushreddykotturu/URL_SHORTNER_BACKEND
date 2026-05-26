const express = require("express");
const {generateShortId, redirectURL, analyticsURL,introductionToApplication} = require("../controllers/url");
const router = express.Router();


router.post("/",generateShortId);
router.get("/analytics/:shortId",analyticsURL);
router.get("/:shortId",redirectURL);

module.exports = router
