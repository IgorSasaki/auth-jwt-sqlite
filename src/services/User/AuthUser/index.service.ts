import { sign } from 'jsonwebtoken'

import authConfig from '../../../config/auth'
import AppError from '../../../errors/appError'
import { encryptPassword } from '../../../utils/User/encryptPassword'
import { findUserByEmail } from '../../../utils/User/findUserByEmail'
import { RequestData } from './types'

class AuthUserService {
  public static async create(requestData: RequestData) {
    const service = new AuthUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const userData = await findUserByEmail(requestData.email)

    if (!userData) {
      throw new AppError('User not found', 400)
    }

    const encryptedPassword = encryptPassword(requestData.password)

    if (userData.password !== encryptedPassword) {
      throw new AppError('Invalid password', 401)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = userData

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: userData.userId,
      expiresIn
    })

    return { user: userWithoutPassword, token }
  }
}

export default AuthUserService
