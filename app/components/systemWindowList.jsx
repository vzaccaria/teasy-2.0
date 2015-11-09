import React from 'react';
import _ from 'lodash'

import SystemWindowListItem from './systemWindowListItem';


import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/systemWindowList');

function getWindowListAsJson() {
    let wins = window.require('native-sgrab-helper').windowListAsJson();
    debug(wins);
    return wins;
}

debug('loaded')


let SystemWindowList = React.createClass({
    render: function()  {
        debug('rendering component');
        let windowList = _.filter(getWindowListAsJson(), (it) => it.layer == 0);
        console.log(windowList);

        let renderedItems = _.map(windowList, (it) => {
            return (
                <SystemWindowListItem item={it} />
            )});

        return(
                <div className="ui divided items">{renderedItems}</div>
        )
    }
});

module.exports = { SystemWindowList }
