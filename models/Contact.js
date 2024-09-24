// models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
