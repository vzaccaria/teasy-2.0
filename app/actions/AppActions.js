var alt = require('../utils/alt');
var { sendWidChange } = require('../utils/liveWinIPC')

import _debug from 'debug';
const debug = _debug('app:actions/AppActions');

debug('loaded')

class AppActions {
    constructor() {
        this.generateActions(
            /* Easier - comma separated list of methods.. */
            'updateWindowSize', /* Use commas to add actions */
            'updateCurrentSystemWindows',
            'updateLiveViewTime',
            'setBreakTime',
            'clearBreakTime',
            'changeLanguage',
            'toggleShowTopBar',
            'updatePointerSettings',
            'updateMouseCoordinates'
        )
    }

    updateCurrentLiveWindow(wid) {
        this.dispatch(wid);
    }
}

module.exports = window.$a = (alt.createActions(AppActions));
