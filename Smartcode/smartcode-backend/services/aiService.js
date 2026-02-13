const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeCode(code_text) {
  try {

    const prompt = `
You are a senior software engineer.

Analyze the following code.

Return ONLY valid JSON in this format:
{
  "summary": "Short explanation",
  "bugs": ["Bug 1", "Bug 2"],
  "improvements": ["Improvement 1", "Improvement 2"],
  "rating": number (0-10)
}

Code:
${code_text}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);

  } catch (error) {
    console.error("AI Service Error:", error);
    // Fallback Mock for testing if API fails or quota exceeded
    return {
      summary: "AI Service Unavailable - Mock Response",
      bugs: ["Could not analyze code due to error"],
      improvements: ["Check API Key", "Check Quota"],
      rating: 0
    };
  }
}

module.exports = { analyzeCode };
