import React from 'react';

const ReviewHistory = ({ history }) => {
    if (!history || history.length === 0) {
        return <div className="history-empty">No reviews yet.</div>;
    }

    return (
        <section className="history-section">
            <h2>Review History</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Code Snippet</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((review) => (
                            <tr key={review.id}>
                                <td>{new Date(review.created_at).toLocaleDateString()}</td>
                                <td className="code-cell">
                                    <code>{review.code_text.substring(0, 50)}...</code>
                                </td>
                                <td>
                                    <span className={`rating-badge ${review.rating >= 7 ? 'good' : review.rating >= 4 ? 'average' : 'poor'}`}>
                                        {review.rating}/10
                                    </span>
                                </td>
                                <td>
                                    <button className="view-btn" onClick={() => alert("Full details view not implemented yet in this demo")}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ReviewHistory;
