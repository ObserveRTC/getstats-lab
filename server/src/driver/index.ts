import {Builder} from 'selenium-webdriver'
import {getBrowserCapabilities, SuppoertedBrowsers} from '../browser.capabilities'


const getDriver = (props: {browserName: SuppoertedBrowsers, browser_version: string, userName: string, userKey: string}) => {
    const capabilities = getBrowserCapabilities({...props})
    console.warn('>','running with capabilities', capabilities)
    const driver = new Builder()
        .usingServer('https://hub-usw.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build()
    return driver
}
export {getDriver}
