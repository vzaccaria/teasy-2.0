import React from 'react';
import { Link } from 'react-router';
import { SystemWindowList } from '../components/systemWindowList.jsx';
// Debug..

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:containers/HomePageContainer');

export default class HomePageContainer extends React.Component {

    render() {
        debug('rendering container');
        debug(SystemWindowList);
        return (
            <div>
                <h2>Home Page</h2>
                <p>This is the homepage.</p>
                <SystemWindowList />
            </div>
        );
    }
}
