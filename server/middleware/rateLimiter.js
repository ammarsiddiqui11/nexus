/**
 * Simple in-memory rate limiter for contact form (no extra deps)
 * @param {number} windowMs - Time window in ms
 * @param {number} max - Max requests per window
 * @returns {import('express').RequestHandler}
 */
export const rateLimiter = (windowMs = 60 * 1000, max = 5) => {
  const store = new Map()

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown'
    const now = Date.now()

    if (!store.has(ip)) {
      store.set(ip, { count: 1, start: now })
      return next()
    }

    const record = store.get(ip)

    if (now - record.start > windowMs) {
      store.set(ip, { count: 1, start: now })
      return next()
    }

    if (record.count >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait before submitting again.',
      })
    }

    record.count++
    return next()
  }
}
