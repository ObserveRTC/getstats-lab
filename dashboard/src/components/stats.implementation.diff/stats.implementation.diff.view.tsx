import React from "react";
import {BrowserDetail, StatsDetails, Status} from "../../redux/root.slice";
import styles from "./stats.implementation.diff.module.scss";
// @ts-ignore
import JsonDiffReact from 'jsondiffpatch-for-react';

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

const getStatus = (status: Status, browserLeft: BrowserDetail, browserRight: BrowserDetail) => {
    if (status === Status.pending) {
        return <span> Fetching stats details [ will take around 30 seconds ]... </span>
    } else if (status === Status.rejected) {
        return <span> Failed to fetch stats details! Please try later </span>
    } else if (status === Status.noop) {
        return <span> Please select a browser version to check stats </span>
    }
    return (
        <div>
                <span>Stats diff for </span>
                <u> {browserLeft.browser} {browserLeft.version} </u>
                <span className={styles.divider}> | </span>
                <u> {browserRight.browser} {browserRight.version} </u>
        </div>)
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
            <div className={styles.status}>
                {getStatus(status, browserLeft, browserRight)}
            </div>
            {
                status === Status.fullfilled && statsListLeft && statsListRight &&
                <>
                    <div className={styles.status}>
                        <span>
                            Total Stats : {getCount(statsListLeft)} <span> | </span> {getCount(statsListRight)}
                        </span>
                    </div>
                    <div className={styles.diffContainer}>
                        <JsonDiffReact
                            left={statsListLeft}
                            right={statsListRight}
                            show={false}
                            objectHash={(obj: any) => obj.id || obj._id || obj.name || JSON.stringify(obj)}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export {StatsImplementationDiffView}

