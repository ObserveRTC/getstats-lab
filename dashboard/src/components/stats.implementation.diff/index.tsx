import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    BrowserDetail,
    fetchBrowserListImplementationDetailsAsync,
    queryStatus,
    selectBrowserList,
    selectImplementationDetails
} from "../../redux/root.slice";
import styles from "./stats.implementation.diff.module.scss";
import {BrowserListView} from "../browser.list";
import {StatsImplementationDiffView} from "./stats.implementation.diff.view";
import {HeaderView} from "../header";

const StatsImplementationDiff = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [browserLeft, setBrowserLeft] = useState<BrowserDetail>({
        browser: '',
        version: ''
    })
    const [browserRight, setBrowserRight] = useState<BrowserDetail>({
        browser: '',
        version: ''
    })
    const browserList = useAppSelector(selectBrowserList)
    const statsListLeft = useAppSelector(selectImplementationDetails(browserLeft))
    const statsListRight = useAppSelector(selectImplementationDetails(browserRight))
    const status = useAppSelector(queryStatus)

    const onBrowserSelectedLeft = ({browser, version}: BrowserDetail) => {
        setBrowserLeft({browser, version})
        if(browserRight.browser && browserRight.version) {
            // if the first browser change and second browser info is also available
            dispatch(fetchBrowserListImplementationDetailsAsync([browserLeft, {browser, version}]))
        }
    }
    const onBrowserSelectedRight = ({browser, version}: BrowserDetail) => {
        setBrowserRight({browser, version})
        if(!browser || !version) return
        dispatch(fetchBrowserListImplementationDetailsAsync([browserLeft, {browser, version}]))
    }

    const swapStats = (left: BrowserDetail, right: BrowserDetail) => {
        setBrowserLeft(right)
        setBrowserRight(left)
    }

    return (
        <div className={styles.parentContainer}>
            <HeaderView/>
            <BrowserListView onSelected={onBrowserSelectedLeft} browserList={browserList} selectedBrowser={browserLeft}/>
            <BrowserListView onSelected={onBrowserSelectedRight} browserList={browserList} selectedBrowser={browserRight}/>
            <StatsImplementationDiffView
                browserLeft={browserLeft}
                browserRight={browserRight}
                statsListLeft={statsListLeft}
                statsListRight={statsListRight}
                status={status}
                swapStats={swapStats}
            />
        </div>
    )
}

export {StatsImplementationDiff}

