import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
