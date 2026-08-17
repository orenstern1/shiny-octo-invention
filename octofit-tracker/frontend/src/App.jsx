import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <nav className="nav nav-pills gap-2 mt-3 flex-wrap">
            <NavLink to="/" className="nav-link">Users</NavLink>
            <NavLink to="/activities" className="nav-link">Activities</NavLink>
            <NavLink to="/teams" className="nav-link">Teams</NavLink>
            <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
            <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
