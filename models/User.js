// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  currentWorkoutType: {
    type: String,
    enum: ['beginner', 'skills', 'fat-burn', 'strength', null],
    default: null
  },
  workoutStartDate: {
    type: Date,
    default: null
  },
  streak: {
    type: Number,
    default: 0
  },
  lastWorkoutDate: {
    type: Date,
    default: null
  },
  completedMissions: [{
    missionId: String,
    completedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Check if the model is already defined to prevent "Cannot overwrite model once compiled" errors
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;