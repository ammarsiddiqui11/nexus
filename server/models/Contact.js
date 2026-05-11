import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be under 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      enum: ['Web Development', 'Web Application', 'UI/UX Design', 'Backend API', 'Full-Stack Project', ''],
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message must be under 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded'],
      default: 'new',
    },
  },
  { timestamps: true }
)

const Contact = mongoose.model('Contact', contactSchema)
export default Contact
