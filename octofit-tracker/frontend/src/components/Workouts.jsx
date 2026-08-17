import { useEffect, useState } from 'react';
import { apiClient } from '../config/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await apiClient.get('/api/workouts');
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to fetch workouts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container py-4">Loading workouts...</div>;

  return (
    <div className="container py-4">
      <h2>Workout Suggestions</h2>
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout._id || workout.name} className="list-group-item">
            <h5>{workout.name}</h5>
            <p className="mb-1">Category: {workout.category}</p>
            <small>{workout.duration} min · {workout.difficulty}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
