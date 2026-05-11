import { Router } from 'express'
import { submitContact, getContacts } from '../controllers/contactController.js'
import { validate, contactSchema } from '../middleware/validate.js'
import { rateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// POST /api/contact — submit form
router.post('/', rateLimiter(60 * 1000, 3), validate(contactSchema), submitContact)

// GET /api/contact — list all (internal use)
router.get('/', getContacts)

export default router
