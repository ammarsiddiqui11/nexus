import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      // Must match SERVICE_OPTIONS in Contact.jsx exactly
      enum: ['E-Commerce Store', 'Landing Page', 'Digital Marketing', 'Local Business Setup', 'Website Revamp', 'Other', ''],
      default: '',
    },
    budget: {
      type: String,
      // Must match BUDGET_OPTIONS in Contact.jsx exactly
      enum: ['8k-12k', '12k-20k', '30k', '50k+', "Let's discuss", ''],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded'],
      default: 'new',
    }
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)


