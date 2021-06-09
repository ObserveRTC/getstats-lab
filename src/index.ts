import { Command } from 'commander'
import {JanusEchotestStats} from './janus.echotest.stats'
import {StatsCollector} from './stats.collector'
import {getDriver} from './driver'
import {wait} from './helper.utils'

const program = new Command('Argument parser')

program.option('-b --browser', 'browser vendor name','Chrome')
program.option('-v --version', 'browser version', '90')
program.option('-u --username', 'BrowserStack username', 'a valid browser stack username')
program.option('-k --key', 'BrowserStack key', 'a valid browser stack key')

const run = async () => {
    await program.parseAsync()
    const {browser, version, username, key} = program.opts()

    if(!browser) {
        console.log('browser vendor name is missing!')
        program.help()
        return
    }
    if(!version) {
        console.log('browser version is missing!')
        program.help()
        return
    }
    if(!username) {
        console.log('BrowserStack username is missing!')
        program.help()
        return
    }
    if(!key) {
        console.log('BrowserStack key!')
        program.help()
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
        await demoApp.runApp(driver)
        // wait for 5 second
        await wait(5)
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
