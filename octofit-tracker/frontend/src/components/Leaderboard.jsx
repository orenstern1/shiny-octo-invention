import { useEffect, useState } from 'react';
import { apiClient } from '../config/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await apiClient.get('/api/leaderboard');
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to fetch leaderboard', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container py-4">Loading leaderboard...</div>;

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">#{entry.rank}</h5>
              <small>{entry.user?.username || 'Unknown user'}</small>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
