import express from 'express'

import AppRouter from './routes/index.routes'

const app = express()

app.use(AppRouter)

app.listen(3333, () => console.log('Server started on 3333 🚀🚀'))
