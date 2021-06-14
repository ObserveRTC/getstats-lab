import {ReplitDB} from './replit.db'

const dbURL = process.env.DB_URL
const db = new ReplitDB(dbURL)
export { db }
