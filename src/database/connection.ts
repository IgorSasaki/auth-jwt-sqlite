import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export const connection = async () => {
  const databaseClient = await open({
    filename: './src/database/database_project.sqlite',
    driver: sqlite3.Database
  })

  return databaseClient
}
