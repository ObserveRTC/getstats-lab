import React from "react";
import {StatsDetails} from "../../redux/root.slice";

export type StatsImplementationDetailsViewProps = {
    statsList: StatsDetails | undefined
}
const StatsImplementationDetailsView = ({statsList}: StatsImplementationDetailsViewProps): React.ReactElement => {
    return (
        <div>
            <>Browser vendor</>
            <>Browser version</>
        </div>
    )
}

export {StatsImplementationDetailsView}

