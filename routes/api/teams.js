const express = require("express");
const router = express.Router();

// @route   GET api/teams
// @desc    Test route
// @access  Public
router.get("/", (req, res) => {
    res.send("Team route")
})

module.exports = router;