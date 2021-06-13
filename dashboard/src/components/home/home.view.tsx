import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.view.module.scss'

const HomeView = (): React.ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{'getStats demos '}</div>
            <div className={styles.demo_list_container}>
                <div className={styles.demo_container}>
                    <Link className={styles.demo_link} to={'/stats-details'}> Stats Implementation Details </Link>
                </div>
            </div>
        </div>
    );
}

export { HomeView };
