import React from "react";
import {BrowserDetail, StatsDetails, Status} from "../../redux/root.slice";
import styles from './stats.implementation.details.module.scss'

const JSONTreeView = require('react-json-inspector');


export type StatsImplementationDetailsViewProps = {
    statsList: StatsDetails
    status: Status,
    browser: BrowserDetail
}

const getCount = (statsList: StatsDetails): number => {
    return Object.values(statsList ?? {}).reduce((sum, current) => sum + current.length, 0)
}

const getStatus = (status: Status, browser: BrowserDetail): string => {
    if (status === Status.pending) {
        return 'Fetching stats details [ will take around 30 seconds ]...'
    } else if (status === Status.rejected) {
        return 'Failed to fetch stats details! Please try later'
    } else if (status === Status.noop) {
        return 'Please select a browser version to check stats'
    }
    return `Stats report for ${browser.browser} ${browser.version}`
}

const StatsImplementationDetailsView = ({
                                            statsList,
                                            status,
                                            browser
                                        }: StatsImplementationDetailsViewProps): React.ReactElement => {
    return (
        <div className={styles.container}>
            <div>
                <div>
                    <span>{getStatus(status, browser)}</span>
                </div>
                {
                    status === Status.fullfilled && statsList &&
                    <>
                        <div>
                            Total Stats : {getCount(statsList)}
                        </div>
                        <div>
                            <JSONTreeView data={statsList}/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export {StatsImplementationDetailsView}

