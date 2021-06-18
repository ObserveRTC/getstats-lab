import {isEqual} from '../helper.utils'

const chromeBypassUserMediaOptions = {
    'goog:chromeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }
}

const firefoxBypassUserMediaOptions = {
    'moz:firefoxOptions': {
        prefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true,
            'media.autoplay.default': 0,
            'media.volume_scale': '0.0'
        }
    }
}

const edgeBypassUserMediaOptions = {
    'ms:edgeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }
}


const defaultCapabilities = {
    'os' : 'Windows',
    'os_version' : '10',
    'browserName' : 'Chrome', // change browser vendor
    'browser_version' : '90', // change browser version here
    'name' : 'Janus echo test',
    'browserstack.local': 'false',
}

type capabilities = typeof defaultCapabilities
export type browser = {
    name: string
    version: string
}


export const getBrowserCapabilities = ({
    browserName,
    browser_version,
    userKey, userName
}: {browserName: SuppoertedBrowsers, browser_version: string, userName: string, userKey: string}): capabilities => {
    let mediaOptions = {}
    if(isEqual(browserName,'Chrome')) {
        mediaOptions = chromeBypassUserMediaOptions
    } else if(isEqual(browserName,'Edge')) {
        mediaOptions = edgeBypassUserMediaOptions
    } else if(isEqual(browserName, 'Firefox')) {
        mediaOptions = firefoxBypassUserMediaOptions
    } else if(isEqual(browserName , 'Safari')) {
        throw new Error('not implemented')
    }

    const capabilities = {
        ...defaultCapabilities,
        ...mediaOptions,
        browserName,
        browser_version,
        'browserstack.user': userName,
        'browserstack.key': userKey
    }
    return capabilities
}
export type SuppoertedBrowsers = 'Chrome' | 'Firefox' | 'Edge' | 'Safari'
