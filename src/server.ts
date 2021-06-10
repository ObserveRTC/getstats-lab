import Fastify, { FastifyInstance } from 'fastify'
import {runBrowserStats} from './stats'
import {getConfig} from './configs'
const config = getConfig()

const server: FastifyInstance = Fastify({
    logger: true
})

server.get('/stats/browser/:browser/version/:version', async (request, reply) => {
    const {browser, version} = request.params as any
    const stats = await runBrowserStats({
        browser,
        version,
        key: config.key,
        username: config.username,
    })
    reply.send(stats)
})

const start = async () => {
    try {
        await server.listen(8080)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start().then(null)
