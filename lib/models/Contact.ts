import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  phone: String,
  group: {
    type: String,
    enum: ['Friends', 'Work', 'Family', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);