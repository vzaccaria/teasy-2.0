import React from 'react';
import AppContainer from './containers/AppContainer';
import { updateWindowSize } from './actions/AppActions';

import '../semantic/src/semantic.less';

import _debug from 'debug';
const debug = _debug('app:mainApp');

window.$mine = { }
window.$mine.enableDebugAll  = () => { _debug.enable('app:*') }
window.$mine.disableDebugAll = () => { _debug.disable('app:*') }

window.$mine.disableDebugAll()

function attachListeners() {
    window.addEventListener('resize', function() {
        debug("resize invoked");
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true);

    window.addEventListener('load', function() {
        debug("load invoked");
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true);
}



React.render(<AppContainer/>, document.getElementById('react-root'));

attachListeners()
