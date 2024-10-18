import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../errors/appError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

const ensureAuthenticated = (
  request: Request,
  _: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      userId: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}

export default ensureAuthenticated
