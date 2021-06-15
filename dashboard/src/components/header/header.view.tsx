import React from "react";
import {Link} from "react-router-dom";

import styles from './header.view.module.scss'

const HeaderView = (): React.ReactElement => {
    return (
        <div className={styles.headerViewRoot}>
            <Link className={styles.demo_link} to={'/stats-details'}> Implementation Details </Link>
            <Link className={styles.demo_link} to={'/stats-diff'}> Implementation Diff </Link>
            <span></span>
        </div>
    )
}

export {HeaderView}
