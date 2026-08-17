import mongoose, { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true },
);

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
