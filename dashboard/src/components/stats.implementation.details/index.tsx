import React, {useState} from "react";
import {StatsImplementationDetailsView} from "./stats.implementation.details.view";
import {
    BrowserDetail,
    fetchBrowserImplementationDetailsAsync,
    queryStatus,
    selectBrowserList,
    selectImplementationDetails
} from "../../redux/root.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {BrowserListView} from "../browser.list";
import styles from './stats.implementation.details.module.scss'
import {HeaderView} from "../header";

const StatsImplementationDetails = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [currentBrowser, setCurrentBrowser] = useState<BrowserDetail>({
        browser: 'StandardStats',
        version: ''
    })
    const browserList = useAppSelector(selectBrowserList)
    const statsList = useAppSelector(selectImplementationDetails(currentBrowser))
    const status = useAppSelector(queryStatus)

    const onBrowserSelected = ({browser, version}: BrowserDetail) => {
        setCurrentBrowser({browser, version})
        if(!browser || !version) return
        dispatch(fetchBrowserImplementationDetailsAsync({browser, version}))
    }

    return (
        <div className={styles.parentContainer}>
            <HeaderView/>
            <BrowserListView onSelected={onBrowserSelected} browserList={browserList} selectedBrowser={currentBrowser}/>
            <StatsImplementationDetailsView statsList={statsList} status={status} browser={currentBrowser}/>
        </div>

    )
}

export {StatsImplementationDetails}

