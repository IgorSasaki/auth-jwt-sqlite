import { Router } from 'express'

import AuthUserService from '../services/User/AuthUser/index.service'
import CreateUserService from '../services/User/CreateUser/index.service'

const UserRouter = Router()

UserRouter.post('/', async (request, response) => {
  const responseData = await CreateUserService.create(request.body)

  return response.json(responseData)
})

UserRouter.post('/auth', async (request, response) => {
  const responseData = await AuthUserService.create(request.body)

  return response.json(responseData)
})

export default UserRouter
