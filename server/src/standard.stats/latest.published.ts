import axios from 'axios'
import * as cheerio from 'cheerio'

class LatestPublished {
    private webrtcStatsContent = async () => {
        const {data} = await axios('https://www.w3.org/TR/webrtc-stats/')
        return cheerio.load(data)
    }

    private getStatsList = ($: cheerio.Root): Array<{ statsName: string; attributes: string[], rowSpan: number }> => {
        return [...$('#summary tbody tr').toArray()]
            .map( trElement => {
                const th = $(trElement).find('th').text().replace(/"/g,'')
                const td = [...$($(trElement).find('td').last()).find('a code').toArray()].map(item => $(item).text())
                const rowSpan = $(trElement).find('th').attr('rowspan') ?? '0'
                return {statsName: th, attributes: td, rowSpan: parseInt(rowSpan, 0)}
            })
    }

    private getFullAttributeList = (rtcStatsList: Array<{ statsName: string; attributes: string[], rowSpan: number }>): Array<{ statsName: string; attributes: string[] }> => {
        if(rtcStatsList?.length < 1) {
            return []
        }
        const currentStats = rtcStatsList[0]
        const totalCount = currentStats?.rowSpan
        const statsList = rtcStatsList.splice(0, totalCount)

        const statsName = currentStats.statsName
        const attributes = statsList.map(item => item.attributes).flat()
        const restRtcStatsList = this.getFullAttributeList(rtcStatsList)
        return [{
            attributes,
            statsName
        }, ...restRtcStatsList]
    }

    private parseStats = async ($: cheerio.Root) => {
        const rtcStats = this.getStatsList($)
        const result = this.getFullAttributeList(rtcStats)
        return result
            .reduce((acc, {statsName, attributes}) => Object.assign(acc, {[statsName]: attributes}), {} )
    }

    parse = async () => {
        const $ = await this.webrtcStatsContent()
        return this.parseStats($)
    }

}

export {LatestPublished}
