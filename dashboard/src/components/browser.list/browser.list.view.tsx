import React from "react";
import {BrowserDetail} from "../../redux/root.slice";

export type StatsImplementationDetailsViewProps = {
    onSelected: (browser: BrowserDetail) => void
    browserList: BrowserDetail[]
}
const BrowserListView = ({onSelected, browserList}: StatsImplementationDetailsViewProps): React.ReactElement => {
    return (
        <div>
            <div>Browser</div>

            <div>Version</div>
        </div>
    )
}

export {BrowserListView}

