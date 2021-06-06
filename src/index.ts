import './config'
import {driver} from './driver'
import {By} from 'selenium-webdriver'

const wait = (timeInSecond: number = 10) => new Promise((resolve) => setTimeout(resolve, timeInSecond*1000))
const saveAwait = async (fn: any) => {
    try {
        await fn()
    } catch (err) {
        console.error(err)
    }
}

const gatherStats = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const statsType = ['codec',
        'inbound-rtp',
        'outbound-rtp',
        'remote-inbound-rtp',
        'remote-outbound-rtp',
        'media-source',
        'csrc',
        'peer-connection',
        'data-channel',
        'stream',
        'track',
        'transceiver',
        'sender',
        'receiver',
        'transport',
        'sctp-transport',
        'candidate-pair',
        'local-candidate',
        'remote-candidate',
        'certificate',
        'ice-server']
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pc = window.echotest.webrtcStuff.pc
    const stats = async () => {
        const statsList = [...await pc.getStats()]
            .filter( item => statsType.includes(item[1].type))
            .map( item => item[1])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.currentStats = statsList
    }
    stats().then(null).catch(null)
}

const collectStats = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return window.currentStats
}

const runStatsCollector = async (times: number = 5) => {
    const statsList = []
    for(let i = 0; i < times; i+= 1) {
        await driver.executeScript(gatherStats)
        const result = await driver.executeScript(collectStats)
        if(result) {
            statsList.push( result)
        }
        // wait for 3 second
        await wait(3)
    }
    return statsList
}

const run = async () => {
    await driver.get('https://janus.conf.meetecho.com/echotest.html')
    await saveAwait(async ()=>{
        await driver.findElement(By.id('start')).click()
    })
    // wait for 5 second
    await wait(5)
    const result = await runStatsCollector(5)
    console.warn(result[result.length -1 ])
    await driver.quit()
}

run().then(null).catch(console.error)
