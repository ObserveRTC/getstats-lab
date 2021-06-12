import React from "react";
import {StatsImplementationDetailsView} from "./stats.implementation.details.view";
import {
    BrowserDetail,
    fetchBrowserImplementationDetailsAsync,
    selectBrowserList,
    selectImplementationDetails
} from "../../redux/root.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {BrowserListView} from "../browser.list";

const StatsImplementationDetails = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const browserList = useAppSelector(selectBrowserList)
    const statsList = useAppSelector(selectImplementationDetails({browser: 'Chrome', version: '90'}))

    const onBrowserSelected = ({browser, version}: BrowserDetail) => {
        dispatch(fetchBrowserImplementationDetailsAsync({browser,version}))
    }

    return (
        <>
            <BrowserListView onSelected={onBrowserSelected} browserList={browserList}/>
            <StatsImplementationDetailsView statsList={statsList}/>
        </>

    )
}

export {StatsImplementationDetails}

