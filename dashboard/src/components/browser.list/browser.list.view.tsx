import React, {useState} from "react";
import {BrowserDetail} from "../../redux/root.slice";
import Select from 'react-select'
import {ValueType} from "react-select/src/types";
import styles from './browser.list.view.module.scss'

export type StatsImplementationDetailsViewProps = {
    onSelected: (browser: BrowserDetail) => void
    browserList: BrowserDetail[]
}

type Option = {
    value: string
    label: string
}

const getBrowserOptions = (browserList: BrowserDetail[]): Option[] => browserList?.map(item => item.browser)
    .reduce((acc: Array<string>, currentItem) => {
        if(acc.includes(currentItem)){
            return acc
        }else {
            return [...acc, currentItem]
        }
    }, [] )
    .map( item => {
        return {
            label: item,
            value: item
        }
    })

const versionOptions = (browserList: BrowserDetail[], browserName?: string): Option[] => browserList?.filter(item => item.browser === browserName)
    .map(item => item.version)
    .reduce((acc: Array<string>, currentItem) => {
        if(acc.includes(currentItem)){
            return acc
        } else {
            return [...acc, currentItem]
        }
    }, [] )
    .map( item => {
        return {
            label: item,
            value: item
        }
    })

const BrowserListView = ({onSelected, browserList}: StatsImplementationDetailsViewProps): React.ReactElement => {

    const browserOptions = getBrowserOptions(browserList)
    const [currentBrowser, setCurrentBrowser] = useState<Option>(browserOptions?.[0])
    const [currentVersion, setCurrentVersion] = useState<Option|null>(null)
    const [versionList, setVersionList] = useState<Option[]>(versionOptions(browserList, currentBrowser?.value))

    const onBrowserChange = (value: ValueType<Option, false>) => {
        const newValue = value as Option
        setCurrentVersion(null)
        setCurrentBrowser(newValue)
        setVersionList(versionOptions(browserList,newValue.value))
    }

    const onVersionChange = (value: ValueType<Option, false>) => {
        const newValue = value as Option
        setCurrentVersion(newValue)
        onSelected({version: newValue.value, browser: currentBrowser.value})
    }

    return (
        <div className={styles.container}>
            <div>
                <div>Browser</div>
                <div>Version</div>
            </div>
            <div>
                <div>
                    <Select
                        isMulti={false}
                        isClearable={false}
                        value={currentBrowser}
                        onChange={onBrowserChange}
                        options={browserOptions}
                    />
                </div>
                <div>
                    <Select
                        isMulti={false}
                        isClearable={false}
                        onChange={onVersionChange}
                        value={currentVersion}
                        options={versionList} />
                </div>
            </div>

        </div>
    )
}

export {BrowserListView}

