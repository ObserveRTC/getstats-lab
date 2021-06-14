const jsoning = require('jsoning')

class JsonDb {
    private readonly client: any
    constructor() {
        this.client = new jsoning('database.json')
    }
    private key = ({browser, version}: {browser: string, version: string}) : string => {
        return `${browser}-${version}`
    }
    hasRecord = async ({browser, version}: {browser: string, version: string}): Promise<boolean> => {
        return await this.client.has( this.key({browser,version}) )
    }

    getRecord = async ({browser, version}: {browser: string, version: string}): Promise<unknown> => {
        const value =  await this.client.get( this.key({browser,version}) )
        return value
    }

    putRecord = async ({browser, version, record}: {browser: string, version: string, record: any}): Promise<void> => {
        await this.client.set( this.key({browser,version}), record )
    }
}

export { JsonDb }
