import Contact from '../models/Contact.js'
import { sendContactEmail } from '../utils/mailer.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, service, budget, message } = req.body

    // Save to DB
    const contact = await Contact.create({ name, email, company, service, budget, message })

    // Respond to client IMMEDIATELY — don't wait for email
    res.status(201).json({
      success: true,
      message: "Message received. We'll be in touch within 24 hours.",
      id: contact._id,
    })

    // Fire email in background after response is already sent
    sendContactEmail({ name, email, company, service, budget, message })
      .catch((err) => console.warn('[WARN] Email sending failed:', err.message))

  } catch (error) {
    next(error)
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).select('-__v')
    return res.status(200).json({ success: true, count: contacts.length, data: contacts })
  } catch (error) {
    next(error)
  }
}