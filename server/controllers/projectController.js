import Project from '../models/Project.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getProjects = async (req, res, next) => {
  try {
    const { featured, category } = req.query
    const filter = {}

    if (featured === 'true') filter.featured = true
    if (category) filter.category = { $regex: category, $options: 'i' }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).select('-__v')

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).select('-__v')
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    return res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}
