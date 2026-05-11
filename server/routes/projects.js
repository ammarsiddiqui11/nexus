import { Router } from 'express'
import { getProjects, getProject } from '../controllers/projectController.js'

const router = Router()

// GET /api/projects
router.get('/', getProjects)

// GET /api/projects/:id
router.get('/:id', getProject)

export default router
