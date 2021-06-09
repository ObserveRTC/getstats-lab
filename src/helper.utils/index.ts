export const wait = (timeInSecond: number = 10) => new Promise((resolve) => setTimeout(resolve, timeInSecond*1000))

export const safeAwait = async (fn: any): Promise<void> => {
    try {
        await fn()
    } catch (err) {
        console.error(err)
    }
}
