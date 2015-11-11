var alt = require('../utils/alt');

import _debug from 'debug';
const debug = _debug('app:actions/LiveWinAppActions');

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
