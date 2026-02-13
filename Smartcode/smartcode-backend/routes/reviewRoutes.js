const express = require("express");
const router = express.Router();

const { analyzeCode } = require("../services/aiService");
const { reviewCode } = require("../controllers/reviewController");

router.post("/review", reviewCode);

router.post("/", async (req, res) => {
  try {
    const { code_text } = req.body;

    if (!code_text) {
      return res.status(400).json({ error: "code_text is required" });
    }

    const result = await analyzeCode(code_text);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});





module.exports = router;
