import { Command } from 'commander'
import {JanusEchotestStats} from './janus.echotest.stats'
import {StatsCollector} from './stats.collector'
import {getDriver} from './driver'

const program = new Command('Argument parser')

program
    .requiredOption('-b, --browser <type>', 'browser vendor name', 'Chrome')
    .requiredOption('-v, --version <type>', 'browser version', '90')
    .requiredOption('-u, --username <type>', 'browser stack username')
    .requiredOption('-k, --key <type>', 'browser stack key')

const run = async () => {
    program.parse(process.argv)
    const {browser, version, username, key} = program.opts()
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
        console.warn(result)
    } catch (err) {
        console.error(err)
    } finally {
        await driver.quit()
    }
}

run().then(null).catch(console.error)
