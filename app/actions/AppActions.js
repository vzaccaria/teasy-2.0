var alt = require('../utils/alt');
var { sendWidChange } = require('../utils/liveWinIPC')

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:actions/AppActions.jsx');

debug('loaded')

class AppActions {
    constructor() {
        this.generateActions(
            /* Easier - comma separated list of methods.. */
        )
    }

    updateCurrentLiveWindow(wid) {
        sendWidChange(wid);
        this.dispatch(wid);
    }
}

module.exports = window.$a = (alt.createActions(AppActions));
