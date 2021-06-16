import {Datastore} from '@google-cloud/datastore'
const googAuth = process.env.GOOG_AUTH
class GCDataStore {
    private readonly client: any
    constructor() {
        if(!googAuth) {
            throw new Error('Google Firebase auth.json credential is required')
        }
        const auth = JSON.parse(Buffer.from(googAuth, 'base64').toString())
        this.client = new Datastore({
            namespace: 'rtcstats',
            projectId: auth.project_id,
            credentials: {
                'type': auth.type,
                'private_key': auth.private_key,
                'client_email': auth.client_email,
                'client_id': auth.client_id,
            }
        })
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
