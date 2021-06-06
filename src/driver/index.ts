import {Builder} from 'selenium-webdriver'
import {userName, userKey} from '../config'

const capabilities = {
    'os' : 'Windows',
    'os_version' : '10',
    'browserName' : 'Chrome',
    'browser_version' : '87.0', // change browser version here
    'name' : 'Janus echo test',
    'browserstack.user': userName(),
    'browserstack.key': userKey(),
    'browserstack.local': 'false',
    'goog:chromeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }
}

console.warn('->','browser stack url', capabilities)
const driver = new Builder()
    .usingServer('https://hub-usw.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build()

export {driver}
