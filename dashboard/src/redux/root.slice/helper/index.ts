// todo move to right place

import {BrowserDetail} from "../index";


const getBrowserList = (browserName: string, latestVersion: number): BrowserDetail[] => {
    const browserList: BrowserDetail[] =
        [...Array(7)]
            .map( (_, index): BrowserDetail => {
                return {
                    browser: browserName,
                    version: `${latestVersion - index}`
                }
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

export const chromeBrowserList = getBrowserList('Chrome', 91)
export const firefoxBrowserList = getBrowserList('Firefox', 89)
export const edgeBrowserList = getBrowserList('Edge', 91)
export const safariBrowserList = getBrowserList('Safari', 14)

export const standardStatsList = getStandardStatsList()

