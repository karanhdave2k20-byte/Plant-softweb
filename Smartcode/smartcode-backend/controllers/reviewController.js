const { analyzeCode } = require("../services/aiService");
const supabase = require("../config/supabaseClient");

exports.reviewCode = async (req, res) => {
  try {
    const { code_text } = req.body;

    // 1. Validate Input
    if (!code_text || typeof code_text !== "string" || code_text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid code_text is required"
      });
    }

    // 2. Call AI Service
    const result = await analyzeCode(code_text);

    // 3. Store in Supabase (Non-blocking)
    let savedReview = null;
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            code_text,
            summary: result.summary,
            bugs: result.bugs,
            improvements: result.improvements,
            rating: result.rating
          }
        ])
        .select();

      if (error) {
        console.warn("Supabase Warning:", error.message);
      } else {
        savedReview = data ? data[0] : null;
      }
    } catch (dbError) {
      console.warn("Supabase Connection Failed:", dbError.message);
    }

    // 4. Return Clean JSON (Always success if AI worked)
    return res.status(200).json({
      success: true,
      data: result,
      saved_review: savedReview,
      warning: !savedReview ? "Review generated but not saved to database (Check API Key)" : null
    });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
