import crypto from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

import { RequestData } from './types'

class CreateUserService {
  public static async create(requestData: RequestData) {
    const service = new CreateUserService()

    return await service.execute(requestData)
  }

  private async execute(requestData: RequestData) {
    const dateNow = new Date()

    const userData: User = {
      ...requestData,
      userId: uuidv4(),
      password: this.encryptPassword(requestData.password),
      createdAt: dateNow.toISOString(),
      updatedAt: dateNow.toISOString()
    }

    // TODO: Save in sqlite

    delete userData.password

    return userData
  }

  private encryptPassword(password: string) {
    return crypto.SHA256(password).toString(crypto.enc.Hex)
  }
}

export default CreateUserService
