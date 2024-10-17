import { Router } from 'express'

import CreateUserService from '../services/User/CreateUser/index.service'

const UserRouter = Router()

UserRouter.post('/', async (request, response) => {
  const responseData = await CreateUserService.create(request.body)

  return response.json(responseData)
})

export default UserRouter
