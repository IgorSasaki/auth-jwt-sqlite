import { connection } from '../connection'

export const createUserTable = async () => {
  const databaseClient = await connection()

  await databaseClient.exec(`
   CREATE TABLE IF NOT EXISTS users (
      userId TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      createdAt TEXT,
      updatedAt TEXT
    );
  `)

  await databaseClient.close()
}
