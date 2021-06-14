import React, {useState} from "react";
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
    swapStats: (left: BrowserDetail, right: BrowserDetail) => void
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
                <u className={styles.fontBold}> {browserRight.browser} {browserRight.version} </u>
        </div>)
}


const StatsImplementationDiffView = ({
    status,
    browserLeft,
    browserRight,
    statsListLeft,
    statsListRight,
    swapStats
}: StatsImplementationDiffViewProps): React.ReactElement => {
    const [show, setShow] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                {getStatus(status, browserLeft, browserRight)}
            </div>
            {
                status === Status.fullfilled && statsListLeft && statsListRight &&
                <>
                    <div className={styles.status}>
                        <div>
                            <input type="checkbox" name="details" className={styles.checkboxInput} checked={show} onChange={ () => setShow(!show)}/>
                            <label htmlFor="details"> Details - Total Stats : {getCount(statsListLeft)} <span> | </span> {getCount(statsListRight)}</label>
                        </div>
                    </div>
                    <div className={styles.status}>
                        <button className={styles.swapStatsBtn} onClick={ () => swapStats(browserLeft, browserRight)}> Swap Stats </button>
                    </div>
                    <div className={styles.diffContainer}>
                        <JsonDiffReact
                            left={statsListLeft}
                            right={statsListRight}
                            show={show}
                            objectHash={(obj: any) => obj.id || obj._id || obj.name || JSON.stringify(obj)}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export {StatsImplementationDiffView}

