// a simple helper function that sort stats so that
// id, kind, timestamp are always at top of the stats

const sortStats = (stats: Record<string, any>) => {
    const retval: Record<string, any> = {}
    for(const [key, values] of Object.entries(stats??{})) {
        retval[key] = ['id','kind','timestamp',...values?.filter( (item: string) => ['id','kind','timestamp'].includes(item) === false )]
    }
    return retval
}

export {sortStats}
