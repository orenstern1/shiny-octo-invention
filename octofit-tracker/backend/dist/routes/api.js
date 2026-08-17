import { Router } from 'express';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Workout } from '../models/Workout.js';
import { Leaderboard } from '../models/Leaderboard.js';
const router = Router();
router.get('/users', async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teams = await Team.find().populate('members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
router.get('/activities', async (_req, res) => {
    try {
        const activities = await Activity.find().populate('user');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
router.get('/leaderboard', async (_req, res) => {
    try {
        const entries = await Leaderboard.find().populate('user').sort({ score: -1, rank: 1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
router.get('/workouts', async (_req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
export default router;
