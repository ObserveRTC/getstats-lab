import {Datastore} from '@google-cloud/datastore'

class GCDataStore {
    private readonly client: any
    constructor() {
        this.client = new Datastore()
    }
    private key = ({browser, version}: {browser: string, version: string}) : string => {
        return `${browser}-${version}`
    }

    getRecord = async ({browser, version}: {browser: string, version: string}): Promise<unknown> => {
        try {
            const kind = 'rtcstats'
            const name = this.key({browser,version})
            const taskKey = this.client.key([kind, name])
            const [{stats}] = await this.client.get(taskKey)
            return stats
        } catch (err) {
            console.error(err)
        }
    }

    putRecord = async ({browser, version, record}: {browser: string, version: string, record: any}): Promise<void> => {
        try {
            const kind = 'rtcstats'
            const name = this.key({browser,version})
            const taskKey = this.client.key([kind, name])
            const task = {
                key: taskKey,
                data: {
                    stats: record,
                },
                excludeFromIndexes: ['stats']
            }
            await this.client.save(task)
        } catch (err) {
            console.error(err)
        }
    }
}

export { GCDataStore }
