import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [{ type: String, trim: true }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    year: { type: String, default: () => new Date().getFullYear().toString() },
    color: { type: String, default: 'from-cyan-500/20 to-blue-600/20' },
    accent: { type: String, default: '#00d4ff' },
  },
  { timestamps: true }
)

const Project = mongoose.model('Project', projectSchema)
export default Project
