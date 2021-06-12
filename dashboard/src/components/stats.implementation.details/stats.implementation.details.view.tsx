import React from "react";
import {StatsDetails} from "../../redux/root.slice";
import styles from './stats.implementation.details.module.scss'

export type StatsImplementationDetailsViewProps = {
    statsList: StatsDetails
}
const StatsImplementationDetailsView = ({statsList}: StatsImplementationDetailsViewProps): React.ReactElement => {
    return (
        <div className={styles.container}>
            <>Browser vendor</>
            <>Browser version</>
        </div>
    )
}

export {StatsImplementationDetailsView}

