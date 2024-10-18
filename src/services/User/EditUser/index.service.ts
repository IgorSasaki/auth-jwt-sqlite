import { connection } from '../../../database/connection'
import AppError from '../../../errors/appError'
import { User } from '../../../models/User'
import { findUserById } from '../../../utils/User/findUserById'
import { RequestData } from './types'

class EditUserService {
  public static async create(requestData: RequestData) {
    const service = new EditUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const user = await findUserById(requestData.userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const updatedUserData = {
      ...user,
      name: requestData.userData.name,
      updatedAt: new Date().toISOString()
    }

    await this.updateUserNameInDatabase(updatedUserData)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUserData
    return userWithoutPassword
  }

  private async updateUserNameInDatabase(userData: User) {
    try {
      const databaseClient = await connection()

      await databaseClient.run(
        `UPDATE users SET name = ?, updatedAt = ? WHERE userId = ?`,
        [userData.name, userData.updatedAt, userData.userId]
      )

      await databaseClient.close()
    } catch (error) {
      console.error({ updateUserNameInDatabaseError: error })

      throw new AppError('Error when updating user name in database', 500)
    }
  }
}

export default EditUserService
