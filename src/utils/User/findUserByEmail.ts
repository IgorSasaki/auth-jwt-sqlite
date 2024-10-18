import { connection } from '../../database/connection'
import AppError from '../../errors/appError'
import { User } from '../../models/User'

export const findUserByEmail = async (email: string) => {
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
