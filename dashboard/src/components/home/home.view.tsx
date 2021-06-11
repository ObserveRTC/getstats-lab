import React from 'react';
import { Link } from 'react-router-dom';

const HomeView = (): React.ReactElement => {
    return (
        <>
            <div>
                <Link to="/stats-details">stats implementation details</Link>
            </div>
            <div>
                <Link to="/stats-reports">stats implementation reports</Link>
            </div>

        </>
    );
}

export { HomeView };
