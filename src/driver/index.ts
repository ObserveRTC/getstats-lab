import {Builder} from 'selenium-webdriver'
import {userName, userKey} from '../config'

const capabilities = {
    'os' : 'Windows',
    'os_version' : '10',
    'browserName' : 'Edge',
    'browser_version' : '91', // change browser version here
    'name' : 'Janus echo test',
    'browserstack.user': userName(),
    'browserstack.key': userKey(),
    'browserstack.local': 'false',
    'ms:edgeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }
    /*'moz:firefoxOptions': {
        prefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true,
            'media.autoplay.default': 0,
            'media.volume_scale': '0.0'
        }
    }*/
    /*'goog:chromeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }*/
}

console.warn('->','browser stack url', capabilities)
const driver = new Builder()
    .usingServer('https://hub-usw.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build()

export {driver}
