import {isEqual} from '../helper.utils'
import {EditorialDraft} from './editorial.draft'
import {LatestPublished} from './latest.published'

const draftVersion = new EditorialDraft()
const latestPublished = new LatestPublished()
const parseStandardStats = async (version: string) => {
    return isEqual(version, 'draft') ? draftVersion.parse(): latestPublished.parse()
}

// parseStandardStats('draftt').then(console.warn).catch(console.warn)
export {
    parseStandardStats
}

