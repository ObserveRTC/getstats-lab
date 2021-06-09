import {By, ThenableWebDriver} from 'selenium-webdriver'
import {safeAwait} from '../helper.utils'

class JanusEchotestStats {

    runApp = async (driver: ThenableWebDriver): Promise<void> => {
        await driver.get('https://janus.conf.meetecho.com/echotest.html')
        await safeAwait(async ()=>{
            await driver.findElement(By.id('start')).click()
        })
    }

    gatherStats = (): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const pc = window.echotest.webrtcStuff.pc
        const stats = async () => {
            const statsList =
                [...await pc.getStats()]
                    .map( item => item[1])
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.currentStats = statsList
        }
        stats().then(null).catch(null)
    }
    collectStats = (): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return window.currentStats
    }
}

export {JanusEchotestStats}
