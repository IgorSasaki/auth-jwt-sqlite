import { Router } from 'express'

import UserRouter from './user.routes'

const AppRouter = Router()

AppRouter.use('/user', UserRouter)

export default AppRouter
