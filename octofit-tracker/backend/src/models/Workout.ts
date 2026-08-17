import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  duration: number;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
