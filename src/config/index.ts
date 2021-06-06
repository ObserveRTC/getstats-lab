import * as dotenv from 'dotenv'

dotenv.config({
    path: './.dotenv',
    debug: true
})

// const getBrowserStackURL = (): string => `https://${process.env.USERNAME}:${process.env.AUTOMATE_KEY}@hub-cloud.browserstack.com/wd/hub`

const userName = () => process.env.USERNAME
const userKey  = () => process.env.AUTOMATE_KEY
export {userKey, userName}
