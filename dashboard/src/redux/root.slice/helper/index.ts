// todo move to right place

import {BrowserDetail} from "../index";


const getBrowserList = (browserName: string, latestVersion: number): BrowserDetail[] => {
    const browserList: BrowserDetail[] =
        [...Array(10)]
            .map( (_, index): BrowserDetail => {
                return {
                    browser: browserName,
                    version: `${latestVersion - index}`
                }
            }).map( (item, index): BrowserDetail => {
                return index === 0 ? {...item, version: `${item.version} beta`}: item
            })
    return browserList
}

const getStandardStatsList = (): BrowserDetail[] => {
    return  [{
        browser: 'StandardStats',
        version: 'Published'
    },{
        browser: 'StandardStats',
        version: 'Draft'
    }]
}

export const chromeBrowserList = getBrowserList('Chrome', 92)
export const firefoxBrowserList = getBrowserList('Firefox', 90)
export const edgeBrowserList = getBrowserList('Edge', 92)
export const safariBrowserList = getBrowserList('Safari', 14)

export const standardStatsList = getStandardStatsList()

