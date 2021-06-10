import {ThenableWebDriver} from 'selenium-webdriver'
import {JanusEchotestStats} from '../janus.echotest.stats'
import {wait} from '../helper.utils'

class StatsCollector {
    runStatsCollector = async ({demoApp, driver, times = 5}: {driver: ThenableWebDriver, demoApp: JanusEchotestStats, times: number}): Promise<unknown> => {
        const statsList = []
        await demoApp.runApp(driver)
        // wait for 5 second
        await wait(5)

        for(let i = 0; i < times; i+= 1) {
            console.warn('>', 'gathering stats', i)
            await driver.executeScript(demoApp.gatherStats)
            const result = await driver.executeScript(demoApp.collectStats)
            console.warn('>', 'collecting stats', i)
            if(result) {
                statsList.push( result)
            }
            // wait for 3 second
            await wait(3)
        }
        // just return the last stats
        return statsList?.[statsList.length -1 ]
    }
}

export {StatsCollector}
