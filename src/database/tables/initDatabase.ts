import { createUserTable } from './userTable'

export const initializeDatabase = async () => {
  await createUserTable()

  console.log('Initialized database and create tables')
}

initializeDatabase()
