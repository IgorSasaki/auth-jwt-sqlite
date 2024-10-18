import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import AuthUserService from '../services/User/AuthUser/index.service'
import CreateUserService from '../services/User/CreateUser/index.service'
import DeleteUserService from '../services/User/DeleteUser/index.service'
import EditUserService from '../services/User/EditUser/index.service'
import GetUserService from '../services/User/GetUser/index.service'

const UserRouter = Router()

UserRouter.post('/', async (request, response) => {
  const responseData = await CreateUserService.create(request.body)

  return response.json(responseData)
})

UserRouter.post('/login', async (request, response) => {
  const responseData = await AuthUserService.create(request.body)

  return response.json(responseData)
})

UserRouter.put('/', ensureAuthenticated, async (request, response) => {
  const userId = request.user.userId

  const responseData = await EditUserService.create({
    userData: request.body,
    userId
  })

  return response.json(responseData)
})

UserRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userId = request.user.userId

  const responseData = await GetUserService.create({
    userId
  })

  return response.json(responseData)
})

UserRouter.delete('/', ensureAuthenticated, async (request, response) => {
  const userId = request.user.userId

  const responseData = await DeleteUserService.create({
    userId
  })

  return response.json(responseData)
})

export default UserRouter
