import React from "react";
import {StatsDetails} from "../../redux/root.slice";
import styles from './stats.implementation.details.module.scss'
const JSONTreeView = require('react-json-inspector');


export type StatsImplementationDetailsViewProps = {
    statsList: StatsDetails
}

const getCount = (statsList: StatsDetails): number => {
    return Object.values(statsList ?? {}).reduce((sum, current) => sum + current.length, 0)
}

const StatsImplementationDetailsView = ({statsList}: StatsImplementationDetailsViewProps): React.ReactElement => {
    return (
        <div className={styles.container}>
            <div>
                <div>
                    Total Stats : { getCount(statsList) }
                </div>
                <div>
                    {statsList && <JSONTreeView data={statsList}/>}
                </div>
            </div>
        </div>
    )
}

export {StatsImplementationDetailsView}

