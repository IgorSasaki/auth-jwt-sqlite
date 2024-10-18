import { connection } from '../../../database/connection'
import AppError from '../../../errors/appError'
import { RequestData } from './types'

class DeleteUserService {
  public static async create(requestData: RequestData) {
    const service = new DeleteUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const user = await this.findUserById(requestData.userId)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    const deleted = await this.deleteUserFromDatabase(requestData.userId)

    if (!deleted) {
      throw new AppError('Error deleting user', 500)
    }

    return { message: 'User deleted successfully' }
  }

  private async findUserById(userId: string) {
    try {
      const databaseClient = await connection()

      const user = await databaseClient.get(
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

  private async deleteUserFromDatabase(userId: string) {
    try {
      const databaseClient = await connection()

      const result = await databaseClient.run(
        `DELETE FROM users WHERE userId = ?`,
        [userId]
      )
      await databaseClient.close()

      return result?.changes !== undefined && result.changes > 0
    } catch (error) {
      console.error({ deleteUserFromDatabaseError: error })

      throw new AppError('Error when deleting user from database', 500)
    }
  }
}

export default DeleteUserService
