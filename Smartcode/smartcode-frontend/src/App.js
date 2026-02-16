import React, { useState, useEffect } from 'react';
import ReviewHistory from './components/ReviewHistory';
import './index.css';
import api from './services/api';

function App() {
    const [code, setCode] = useState('');
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get('/history');
            if (response.data.success) {
                setHistory(response.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    const handleReview = async () => {
        if (!code.trim()) return;

        setLoading(true);
        setError(null);
        setReview(null);

        try {
            const response = await api.post('/review', { code_text: code });
            if (response.data.success) {
                setReview(response.data.data);
                fetchHistory(); // Refresh history after new review
            } else {
                setError(response.data.message || 'Review failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network Error - Check Backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>SmartCode - AI Code Reviewer</h1>
            </header>

            <main>
                <section className="input-section">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste your code here..."
                        rows={15}
                    />
                    <button
                        onClick={handleReview}
                        disabled={loading || !code.trim()}
                    >
                        {loading ? <span className="loader">Analyzing...</span> : 'Review Code'}
                    </button>
                </section>

                {error && <div className="error">{error}</div>}

                {review && (
                    <section className="review-section">
                        <div className="rating">
                            <span>Rating:</span> <strong>{review.rating}/10</strong>
                        </div>

                        <div className="summary">
                            <h3>Summary</h3>
                            <p>{review.summary}</p>
                        </div>

                        <div className="bugs">
                            <h3>Possible Bugs</h3>
                            <ul>
                                {review.bugs.map((bug, i) => <li key={i}>{bug}</li>)}
                            </ul>
                        </div>

                        <div className="improvements">
                            <h3>Improvements</h3>
                            <ul>
                                {review.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                            </ul>
                        </div>
                    </section>
                )}

                <ReviewHistory history={history} />
            </main>
        </div >
    );
}

export default App;
