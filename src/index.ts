import express from 'express'
import 'express-async-errors'

import ensureErrors from './middlewares/ensureErrors'
import AppRouter from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(AppRouter)

app.use(ensureErrors)

app.listen(3333, () => console.log('Server started on 3333 🚀🚀'))
