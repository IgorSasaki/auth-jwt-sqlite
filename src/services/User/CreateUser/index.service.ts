import { v4 as uuidv4 } from 'uuid'

import { connection } from '../../../database/connection'
import AppError from '../../../errors/appError'
import { User } from '../../../models/User'
import { encryptPassword } from '../../../utils/User/encryptPassword'
import { findUserByEmail } from '../../../utils/User/findUserByEmail'
import { RequestData } from './types'

class CreateUserService {
  private static readonly dateNow = new Date()

  public static async create(requestData: RequestData) {
    const service = new CreateUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const existingUser = await findUserByEmail(requestData.email)

    if (existingUser) {
      throw new AppError('User already exists with this email', 400)
    }

    const encryptedPassword = encryptPassword(requestData.password)

    const userData = {
      ...requestData,
      userId: uuidv4(),
      createdAt: CreateUserService.dateNow.toISOString(),
      updatedAt: CreateUserService.dateNow.toISOString()
    }

    await this.saveDataInDatabase({ ...userData, password: encryptedPassword })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, userId: __, ...userWithoutPassword } = userData

    return userWithoutPassword
  }

  private async saveDataInDatabase(userData: User) {
    try {
      const databaseClient = await connection()

      await databaseClient.run(
        `INSERT INTO users (userId, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userData.userId,
          userData.name,
          userData.email,
          userData.password,
          userData.createdAt,
          userData.updatedAt
        ]
      )

      await databaseClient.close()
    } catch (error) {
      console.error({ saveDataInDatabaseError: error })

      throw new AppError('Error when creating user in database', 500)
    }
  }
}

export default CreateUserService
