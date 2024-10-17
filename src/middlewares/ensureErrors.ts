import { NextFunction, Request, Response } from 'express'

import AppError from '../errors/appError'

const ensureErrors = (
  internalError: Error,
  _: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): Response => {
  if (internalError instanceof AppError) {
    return response
      .status(internalError.statusCode)
      .json({ status: 'Error', message: internalError.message })
  }

  console.error({ internalError })

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error'
  })
}

export default ensureErrors
