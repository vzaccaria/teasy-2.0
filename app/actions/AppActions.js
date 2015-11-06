var alt = require('../utils/alt');

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:actions/AppActions.jsx');

debug('loaded')

class AppActions {
    constructor() {
        this.generateActions(
            'updateCurrentLiveWindow' /* Use commas to add actions */
        )
    }
}

module.exports = window.$a = alt.createActions(AppActions);
