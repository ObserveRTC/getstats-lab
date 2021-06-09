import {
    chromeBypassUserMediaOptions,
    edgeBypassUserMediaOptions,
    firefoxBypassUserMediaOptions
} from '../browser.options'

const defaultCapabilities = {
    'os' : 'Windows',
    'os_version' : '10',
    'browserName' : 'Chrome', // change browser vendor
    'browser_version' : '90', // change browser version here
    'name' : 'Janus echo test',
    'browserstack.local': 'false',
}

type capabilities = typeof defaultCapabilities
type browser = {
    name: string
    version: string
}

export const getBrowserCapabilities = ({
    browserName,
    browser_version,
    userKey, userName
}: {browserName: SuppoertedBrowsers, browser_version: string, userName: string, userKey: string}): capabilities => {
    let mediaOptions = {}
    if(browserName === 'Chrome') {
        mediaOptions = chromeBypassUserMediaOptions
    } else if(browserName === 'Edge') {
        mediaOptions = edgeBypassUserMediaOptions
    } else if(browserName === 'Firefox') {
        mediaOptions = firefoxBypassUserMediaOptions
    } else if(browserName === 'Safari') {
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
