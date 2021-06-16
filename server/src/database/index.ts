import {GCDataStore} from './datastore.db'

// const dbURL = process.env.DB_URL
// const db = new ReplitDB(dbURL)
const db = new GCDataStore()
export { db }
