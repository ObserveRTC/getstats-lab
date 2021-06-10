import Client from '@replit/database'
class ReplitDB {
    private readonly client;
    constructor(replitDbUrl: string) {
        this.client = new Client(replitDbUrl)
    }
    private key = ({browser, version}: {browser: string, version: string}) : string => {
        return `${browser}-${version}`
    }
    hasRecord = async ({browser, version}: {browser: string, version: string}): Promise<boolean> => {
        const value =  await this.client.get( this.key({browser,version}) )
        return !!value
    }

    getRecord = async ({browser, version}: {browser: string, version: string}): Promise<unknown> => {
        const value =  await this.client.get( this.key({browser,version}) )
        return value
    }

    putRecord = async ({browser, version, record}: {browser: string, version: string, record: any}): Promise<void> => {
        await this.client.set( this.key({browser,version}), record )
    }
}

export { ReplitDB }
