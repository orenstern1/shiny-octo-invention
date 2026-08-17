import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Workout } from '../models/Workout.js';
import { Leaderboard } from '../models/Leaderboard.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Workout.deleteMany({});
        await Leaderboard.deleteMany({});
        const users = await User.insertMany([
            {
                username: 'runner_alex',
                email: 'alex@example.com',
                password: 'password123',
                workoutsCompleted: 12,
                streak: 8,
            },
            {
                username: 'strength_sam',
                email: 'sam@example.com',
                password: 'password123',
                workoutsCompleted: 10,
                streak: 6,
            },
            {
                username: 'yoga_ivy',
                email: 'ivy@example.com',
                password: 'password123',
                workoutsCompleted: 14,
                streak: 9,
            },
        ]);
        const team = await Team.create({
            name: 'Mergington Mavericks',
            members: users.map((user) => user._id),
            points: 1200,
        });
        await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Running',
                duration: 30,
                caloriesBurned: 320,
            },
            {
                user: users[1]._id,
                type: 'Strength',
                duration: 40,
                caloriesBurned: 280,
            },
            {
                user: users[2]._id,
                type: 'Yoga',
                duration: 25,
                caloriesBurned: 210,
            },
        ]);
        await Workout.insertMany([
            { name: '5K Cardio Blast', category: 'Cardio', duration: 30, difficulty: 'Intermediate' },
            { name: 'Core Strength Circuit', category: 'Strength', duration: 35, difficulty: 'Advanced' },
            { name: 'Mobility Flow', category: 'Recovery', duration: 20, difficulty: 'Beginner' },
        ]);
        await Leaderboard.insertMany([
            { user: users[0]._id, score: 980, rank: 1 },
            { user: users[2]._id, score: 930, rank: 2 },
            { user: users[1]._id, score: 890, rank: 3 },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
