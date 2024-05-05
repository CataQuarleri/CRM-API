import { Schema, model, Mixed } from 'mongoose';

const reviewSchema = new Schema({
  user: { id: Mixed, name: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
  // Poll questions
  recommendToFriend: { type: Boolean, required: true },
  satisfactionLevel: { type: String, enum: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] }
});
reviewSchema.index({rating: -1})
const Review = model('reviews', reviewSchema);

export default Review;