import Joi from 'joi'

/**
 * @param {Joi.Schema} schema
 * @returns {import('express').RequestHandler}
 */
export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true })

  if (error) {
    const details = error.details.map((d) => ({
      field: d.path[0],
      message: d.message.replace(/"/g, ''),
    }))
    return res.status(400).json({ success: false, message: 'Validation failed', errors: details })
  }

  req.body = value
  next()
}

export const contactSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().trim().email().required(),
  company: Joi.string().trim().max(100).allow('').optional(),
  service: Joi.string().trim().allow('').optional(),
  budget: Joi.string().trim().allow('').optional(),
  message: Joi.string().trim().min(10).max(2000).required(),
})
