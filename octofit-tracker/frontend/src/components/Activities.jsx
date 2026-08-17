import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities`);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to fetch activities', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container py-4">Loading activities...</div>;

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.type} className="list-group-item">
            <h5>{activity.type}</h5>
            <p className="mb-1">Duration: {activity.duration} min</p>
            <small>Calories: {activity.caloriesBurned}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
