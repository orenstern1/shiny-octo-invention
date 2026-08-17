import { useEffect, useState } from 'react';
import { apiClient } from '../config/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await apiClient.get('/api/teams');
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to fetch teams', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container py-4">Loading teams...</div>;

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id || team.name} className="list-group-item">
            <h5>{team.name}</h5>
            <p className="mb-1">Points: {team.points}</p>
            <small>Members: {team.members?.length || 0}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
