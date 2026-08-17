import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  workoutsCompleted: number;
  streak: number;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workoutsCompleted: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
