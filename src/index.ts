import { Command } from 'commander'
import {JanusEchotestStats} from './janus.echotest.stats'
import {StatsCollector} from './stats.collector'
import {getDriver} from './driver'
import {parseImplementedStats} from './stats.report'
const program = new Command('Argument parser')
import {ReplitDB} from './database'

program
    .requiredOption('-b, --browser <type>', 'browser vendor name', 'Chrome')
    .requiredOption('-v, --version <type>', 'browser version', '90')
    .requiredOption('-u, --username <type>', 'browser stack username')
    .requiredOption('-k, --key <type>', 'browser stack key')
    .option('-d, --dburl <type>', 'replit database url')

const run = async () => {
    // In replit, key and username will come from secret which is pass as environment variable in replit
    const envKey = process.env.key
    const envUserName = process.env.username
    const replitDbUrl = process.env.REPLIT_DB_URL
    if(envKey) process.argv.push(...['-k',envKey])
    if(envUserName) process.argv.push(...['-u', envUserName])
    if(replitDbUrl) process.argv.push(...['-d', replitDbUrl])

    program.parse(process.argv)
    const {browser, version, username, key} = program.opts()

    let db:ReplitDB | undefined = undefined
    if(replitDbUrl)
        db = new ReplitDB(replitDbUrl)

    if(db && await db.hasRecord({browser, version})) {
        const data = await db.getRecord({browser,version})
        console.warn('->', data)
        return
    }
    const demoApp = new JanusEchotestStats()
    const statsCollector = new StatsCollector()
    const driver = getDriver({
        userKey: key,
        userName: username,
        browserName: browser,
        browser_version: version
    })
    try {
        const result = await statsCollector.runStatsCollector({
            demoApp, driver, times: 5
        })
        const implementedStats = parseImplementedStats(result)
        if(db)
            await db.putRecord({record: implementedStats, browser, version})
    } catch (err) {
        console.error(err)
    } finally {
        await driver.quit()
    }
}

run().then(null).catch(console.error)
