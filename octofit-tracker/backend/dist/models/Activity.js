import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    caloriesBurned: { type: Number, default: 0 },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
