import mongoose, { Schema, model, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  points: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);
