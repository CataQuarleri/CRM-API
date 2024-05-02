import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
  // Poll questions
  recommendToFriend: { type: Boolean, required: true },
  satisfactionLevel: { type: String, enum: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] }
});

const Review = model('reviews', reviewSchema);

export default Review;