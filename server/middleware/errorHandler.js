/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`)

  const status = err.statusCode || 500
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Internal server error'
    : err.message || 'Internal server error'

  res.status(status).json({ success: false, message })
}

export default errorHandler
