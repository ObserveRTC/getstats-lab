import Fastify, { FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'
import fastifyStatic from '@vottuscode/fastify-vue-static'
import {runBrowserStats} from './stats'
import {getConfig} from './configs'
import * as path from 'path'
import {sortStats} from './sort.stats'
import {isStandardStats} from './helper.utils'
import {parseStandardStats} from './standard.stats'
const config = getConfig()

const server: FastifyInstance = Fastify({
    logger: true,
})
server.register(fastifyCors)
server.register(fastifyStatic, {
    root: path.join(__dirname, '../dashboard'),
    prefix: '/',
})

server.get('/stats/browser/:browser/version/:version', async (request, reply) => {
    const {browser, version} = request.params as any
    let stats: Record<string, any>
    if(isStandardStats(browser)) {
        stats = await parseStandardStats(version)
    } else {
        stats = await runBrowserStats({
            browser,
            version,
            key: config.key,
            username: config.username,
        })
    }
    reply.send(sortStats(stats))
})

const start = async () => {
    try {
        await server.listen(config.port, '0.0.0.0')
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start().then(null)
