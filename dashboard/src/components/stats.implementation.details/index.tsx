import React, {useState} from "react";
import {StatsImplementationDetailsView} from "./stats.implementation.details.view";
import {
    BrowserDetail,
    fetchBrowserImplementationDetailsAsync,
    selectBrowserList,
    selectImplementationDetails
} from "../../redux/root.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {BrowserListView} from "../browser.list";
import styles from './stats.implementation.details.module.scss'

const StatsImplementationDetails = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [currentBrowser, setCurrentBrowser] = useState<BrowserDetail>({
        browser: '',
        version: ''
    })
    const browserList = useAppSelector(selectBrowserList)
    const statsList = useAppSelector(selectImplementationDetails(currentBrowser))

    const onBrowserSelected = ({browser, version}: BrowserDetail) => {
        setCurrentBrowser({browser, version})
        dispatch(fetchBrowserImplementationDetailsAsync({browser,version}))
    }

    return (
        <div className={styles.parentContainer}>
            <BrowserListView onSelected={onBrowserSelected} browserList={browserList}/>
            <StatsImplementationDetailsView statsList={statsList}/>
        </div>

    )
}

export {StatsImplementationDetails}

