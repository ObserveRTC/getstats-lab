export const parseImplementedStats = (stats: any): { [key: string]: string[] } => {
    return  stats?.map((item: { type?: any }) => {
            const itemType = item.type as string
            const keyList = Object.keys(item) as string[]
            return {
                itemType,
                keyList
            }
        })?.reduce((acc: { [key: string]: string[] }, current: { itemType: string; keyList: string[] }) => {
            const {itemType, keyList} = current
            if(!acc[itemType]) {
                acc[itemType] = []
            }
            acc[itemType] = [...new Set([...acc[itemType], ...keyList])]
            return acc
        }, {})
}
