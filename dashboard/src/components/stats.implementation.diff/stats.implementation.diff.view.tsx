import React from "react";
import {BrowserDetail, StatsDetails, Status} from "../../redux/root.slice";
import styles from "../stats.implementation.details/stats.implementation.details.module.scss";

export type StatsImplementationDiffViewProps = {
    status: Status,
    browserLeft: BrowserDetail
    browserRight: BrowserDetail
    statsListLeft: StatsDetails
    statsListRight: StatsDetails
}

const getCount = (statsList: StatsDetails): number => {
    return Object.values(statsList ?? {}).reduce((sum, current) => sum + current.length, 0)
}

const getStatus = (status: Status, browserLeft: BrowserDetail, browserRight: BrowserDetail): string => {
    if (status === Status.pending) {
        return 'Fetching stats details [ will take around 30 seconds ]...'
    } else if (status === Status.rejected) {
        return 'Failed to fetch stats details! Please try later'
    } else if (status === Status.noop) {
        return 'Please select a browser version to check stats'
    }
    return `Stats report for ${browserLeft.browser} ${browserLeft.version} <-> ${browserRight.browser} ${browserRight.version}`
}

const StatsImplementationDiffView = ({
    status,
    browserLeft,
    browserRight,
    statsListLeft,
    statsListRight
}: StatsImplementationDiffViewProps): React.ReactElement => {

    return (
        <div className={styles.container}>
            <div>
                <div>
                    <span>{getStatus(status, browserLeft, browserRight)}</span>
                </div>
                {
                    status === Status.fullfilled && statsListLeft && statsListRight &&
                    <>
                        <div>
                            Total Stats : {`${getCount(statsListLeft)} <- > ${getCount(statsListRight)}`}
                        </div>
                        <div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export {StatsImplementationDiffView}

