import {ThenableWebDriver} from 'selenium-webdriver'
import {JanusEchotestStats} from '../janus.echotest.stats'
import {wait} from '../helper.utils'

class StatsCollector {
    runStatsCollector = async ({demoApp, driver, times = 5}: {driver: ThenableWebDriver, demoApp: JanusEchotestStats, times: number}): Promise<unknown> => {
        const statsList = []
        for(let i = 0; i < times; i+= 1) {
            console.warn('>', 'gathering stats')
            await driver.executeScript(demoApp.gatherStats)
            console.warn('>', 'collecting stats')
            const result = await driver.executeScript(demoApp.collectStats)
            if(result) {
                statsList.push( result)
            }
            // wait for 3 second
            await wait(3)
        }
        // just return the last stats
        console.warn('>','return last known stats')
        return statsList?.[statsList.length -1 ]
    }
}

export {StatsCollector}