import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users`);
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container py-4">Loading users...</div>;

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id || user.username} className="list-group-item">
            <h5>{user.username}</h5>
            <p className="mb-1">{user.email}</p>
            <small>Workouts: {user.workoutsCompleted} · Streak: {user.streak}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
