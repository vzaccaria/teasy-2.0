var alt = require('../utils/alt');

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:actions/LiveWinAppActions.jsx');

debug('loaded')

class LiveWinAppActions {
    constructor() {
        this.generateActions(
            'updateCurrentLiveWindow',
            'updateWindowSize' /* Use commas to add actions */
        )
    }
}

module.exports = window.$a = alt.createActions(LiveWinAppActions);
