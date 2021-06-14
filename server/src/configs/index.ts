import {Command} from 'commander'

const program = new Command('Argument parser')
program
    .requiredOption('-u, --username <type>', 'browser stack username')
    .requiredOption('-k, --key <type>', 'browser stack key')
    .option('-p, --port <type>', 'server port', '8080')

type options = {
    username: string
    key: string
    port: string
}
export const getConfig = (): options => {
    const port = process.env.PORT
    if(port) {
        process.argv.push('-p')
        process.argv.push(`${port}`)
    }
    console.warn('->', process.argv)
    program.parse(process.argv)
    return program.opts() as options
}
