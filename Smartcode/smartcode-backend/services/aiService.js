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
      summary: "⚠️ API Quota Exceeded / Error. Displaying SIMULATED review for demonstration.\n\nThe code structure appears valid. However, proper error handling is recommended for production environments. Consider extracting magic numbers into constants.",
      bugs: [
        "Potential memory leak in event listener binding",
        "Missing validation for 'code_text' input",
        "Uncaught, unspecified error in catch block"
      ],
      improvements: [
        "Use 'const' for variables that are never reassigned",
        "Add JSDoc comments for better code documentation",
        "Implement a retry mechanism for network requests"
      ],
      rating: 7
    };
  }
}

module.exports = { analyzeCode };
