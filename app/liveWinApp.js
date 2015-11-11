import React from 'react';

import LiveWinContainer from './containers/LiveWinContainer';
import { updateWindowSize } from './actions/LiveWinAppActions';
import { listenToWidChange } from './utils/liveWinIPC';
import _debug from 'debug';
import '../semantic/src/semantic.less';


const debug = _debug('app:liveWinApp');
debug('Live w. started');

function registerListeners() {
    listenToWidChange();
    window.addEventListener('resize', function() {
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true)
}


React.render(<LiveWinContainer/>, document.getElementById('react-live-win-root'));

registerListeners()
