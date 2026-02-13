import { useState } from "react";

function CodeReview() {

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleReview = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code_text: code })
      });

      const data = await response.json();
      setResult(data.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleReview}>Review</button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div>
          <h3>Summary</h3>
          <p>{result.summary}</p>

          <h3>Bugs</h3>
          <ul>
            {result.bugs.map((bug, i) => (
              <li key={i}>{bug}</li>
            ))}
          </ul>

          <h3>Improvements</h3>
          <ul>
            {result.improvements.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>

          <h3>Rating: {result.rating}/10</h3>
        </div>
      )}
    </div>
  );
}

export default CodeReview;
