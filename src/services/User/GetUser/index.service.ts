import AppError from '../../../errors/appError'
import { findUserById } from '../../../utils/User/findUserById'
import { RequestData } from './types'

class GetUserService {
  public static async create(requestData: RequestData) {
    const service = new GetUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const user = await findUserById(requestData.userId)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, userId: __, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}

export default GetUserService
