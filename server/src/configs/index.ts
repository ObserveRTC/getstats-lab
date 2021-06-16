import {Command} from 'commander'

const program = new Command('Argument parser')
program
    .requiredOption('-u, --username <type>', 'browser stack username')
    .requiredOption('-k, --key <type>', 'browser stack key')
    .requiredOption('-g, --goog <type>', 'google firebase auth json')
    .option('-p, --port <type>', 'server port', '8080')

type options = {
    username: string
    key: string
    port: string
    googAuth: string
}

export const getConfig = (): options => {
    const port = process.env.PORT
    const username = process.env.USERNAME
    const key = process.env.KEY
    const googAuth = process.env.GOOG_AUTH

    if(port) {
        process.argv.push('-p')
        process.argv.push(`${port}`)
    }
    if(username) {
        process.argv.push('-u')
        process.argv.push(`${username}`)
    }
    if(key) {
        process.argv.push('-k')
        process.argv.push(`${key}`)
    }
    if(googAuth) {
        process.argv.push('-g')
        process.argv.push(`${googAuth}`)
    }
    program.parse(process.argv)
    return program.opts() as options
}
