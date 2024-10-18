import { connection } from '../../../database/connection'
import AppError from '../../../errors/appError'
import { findUserById } from '../../../utils/User/findUserById'
import { RequestData } from './types'

class DeleteUserService {
  public static async create(requestData: RequestData) {
    const service = new DeleteUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const user = await findUserById(requestData.userId)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    const deleted = await this.deleteUserFromDatabase(requestData.userId)

    if (!deleted) {
      throw new AppError('Error deleting user', 500)
    }

    return { message: 'User deleted successfully' }
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
