import {JanusEchotestStats} from './janus.echotest.stats'
import {StatsCollector} from './stats.collector'
import {getDriver} from './driver'
import {parseImplementedStats} from './stats.report'
import {db} from './database'
import {SuppoertedBrowsers} from './browser.capabilities'

export const runBrowserStats = async ({
    browser,
    version,
    key,
    username,
}: {browser: SuppoertedBrowsers, version: string, key: string, username: string}) => {

    const record = await db.getRecord({browser, version})
    if(record) {
        return record
    }
    const demoApp = new JanusEchotestStats()
    const statsCollector = new StatsCollector()
    const driver = getDriver({
        userKey: key,
        userName: username,
        browserName: browser,
        browser_version: version
    })
    let implementedStats: { [key: string]: string[] } = {}
    try {
        const result = await statsCollector.runStatsCollector({
            demoApp, driver, times: 5
        })
        implementedStats = parseImplementedStats(result)
        await db.putRecord({record: implementedStats, browser, version})
    } catch (err) {
        console.error(err)
    } finally {
        await driver.quit()
    }
    return implementedStats
}
