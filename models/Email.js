// models/Email.js
import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Email || mongoose.model('Email', EmailSchema);
