import crypto from 'crypto-js'
import { sign } from 'jsonwebtoken'

import authConfig from '../../../config/auth'
import { connection } from '../../../database/connection'
import AppError from '../../../errors/appError'
import { User } from '../../../models/User'
import { RequestData } from './types'

class AuthUserService {
  public static async create(requestData: RequestData) {
    const service = new AuthUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const userData = await this.findUserByEmail(requestData.email)

    if (!userData) {
      throw new AppError('User not found', 404)
    }

    const encryptedPassword = this.encryptPassword(requestData.password)

    if (userData.password !== encryptedPassword) {
      throw new AppError('Invalid password', 401)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    const { password: userPassword, userId, ...userWithoutPassword } = userData

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: userData.userId,
      expiresIn
    })

    return { userData: userWithoutPassword, token }
  }

  private async findUserByEmail(email: string) {
    try {
      const databaseClient = await connection()

      const user = await databaseClient.get<User>(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      )
      await databaseClient.close()

      return user
    } catch (error) {
      console.error({ findUserByEmailError: error })
      throw new AppError('Error when searching for user in database', 500)
    }
  }

  private encryptPassword(password: string) {
    return crypto.SHA256(password).toString(crypto.enc.Hex)
  }
}

export default AuthUserService
