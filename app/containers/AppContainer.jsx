import React from 'react';
import { SystemWindowList } from '../components/systemWindowList.jsx';
import PreviewContainer from './PreviewContainer'

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:container/AppContainer');

debug('loaded!!');

export default class AppContainer extends React.Component {

    render() {
        return (
            <div className="ui grid">
                <div className="six wide column">
                    <SystemWindowList />
                </div>
                <div className="ten wide column">
                    <PreviewContainer />
                </div>
            </div>
        );
    }

}
