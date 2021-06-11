import React, {useEffect} from "react";
import {StatsImplementationDetailsView} from "./stats.implementation.details.view";
import {fetchBrowserImplementationDetailsAsync, selectBrowserList} from "../../redux/root.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

const StatsImplementationDetails = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const browserList = useAppSelector(selectBrowserList)
    console.warn('->', browserList)
    useEffect(()=> {
        dispatch(fetchBrowserImplementationDetailsAsync({browser: 'Chrome', version: '90'}))
    },[])
    return (<StatsImplementationDetailsView/>)
}

export {StatsImplementationDetails}

