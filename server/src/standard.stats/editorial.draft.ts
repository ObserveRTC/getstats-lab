import axios from 'axios'
import * as cheerio from 'cheerio'
import {IDLRootType, parse} from 'webidl2'

class EditorialDraft {
    private webrtcStatsContent = async () => {
        const {data} = await axios('https://w3c.github.io/webrtc-stats')
        return cheerio.load(data)
    }

    private getStatsIdl = ($: cheerio.Root): IDLRootType[] => {
        const rtcStats = [...$('pre.idl').toArray()]
            .map( item => $(item).text()?.trim())
            .join('\n')
        return parse(rtcStats)
    }

    private getStats = (statsIdl: IDLRootType[], statsType: string): IDLRootType | null => {
        return statsIdl
            .find(item => 'name' in item ? item.name === statsType : null)
    }

    private getStatsAttributes = (currentStats: IDLRootType | null) => {
        if ('values' in currentStats && currentStats.values)
            return currentStats.values.map(item => item.value)
        else if ('members' in currentStats && currentStats.members)
            return currentStats.members.map((item: any) => item.name)

        return null
    }

    private getFullAttributeList = (statsIdl: IDLRootType[], statsType: string) => {
        const currentStats = this.getStats(statsIdl, statsType)
        let attributeList = this.getStatsAttributes(currentStats)
        // if it has inheritance ?
        if('inheritance' in currentStats && currentStats.inheritance ) {
            const inheritedAttributeList = this.getFullAttributeList(statsIdl, currentStats.inheritance)
            attributeList = [...attributeList, ...inheritedAttributeList]
        }

        return attributeList
    }

    private getStatsList = ($: cheerio.Root): Array<{ statsName: string; inherits: string[] }> => {
        const parseName = (th: string) => {
            const regex = /^({{(\w+)\/")([\w-]+)("}})$/gm
            return regex.exec(th)?.[3]
        }
        const getInherits = (td: string) => {
            return td.trim().split(' ').map(item => item.replace(/[{}]/g,''))
        }
        return [...$('#summary tbody tr').toArray()]
            .map( trElement => {
                const th = $(trElement).find('th').text()
                const td = $(trElement).find('td').text()
                return {statsName: parseName(th), inherits: getInherits(td)}
            })
    }

    private parseStats = async ($: cheerio.Root) => {
        const statsIdl = this.getStatsIdl($)
        const rtcStats = this.getStatsList($)

        return rtcStats.map( ({statsName, inherits}): {statsName:string, attributes: Array<string>} => {
            const attributes = inherits
                .map(statsType => this.getFullAttributeList(statsIdl, statsType))
                .flat()
                .reduce((acc: string[], current)=> acc.includes(current) ? acc : [...acc,current] ,[])
                return {statsName, attributes}
            })
            .reduce((acc, {statsName, attributes}) => Object.assign(acc, {[statsName]: attributes}), {} )
    }

    parse = async () => {
        const $ = await this.webrtcStatsContent()
        return this.parseStats($)
    }

}

export {EditorialDraft}
