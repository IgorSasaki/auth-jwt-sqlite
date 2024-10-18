import { connection } from '../../../database/connection'
import AppError from '../../../errors/appError'
import { User } from '../../../models/User'
import { RequestData } from './types'

class GetUserService {
  public static async create(requestData: RequestData) {
    const service = new GetUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const user = await this.findUserById(requestData.userId)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  }

  private async findUserById(userId: string) {
    try {
      const databaseClient = await connection()

      const user = await databaseClient.get<User>(
        `SELECT * FROM users WHERE userId = ?`,
        [userId]
      )
      await databaseClient.close()

      return user
    } catch (error) {
      console.error({ findUserByIdError: error })

      throw new AppError('Error when searching for user in database', 500)
    }
  }
}

export default GetUserService
