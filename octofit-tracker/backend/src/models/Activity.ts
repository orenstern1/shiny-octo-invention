import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  date: Date;
  caloriesBurned: number;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    caloriesBurned: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', activitySchema);
