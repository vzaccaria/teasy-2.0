import React from 'react';
import _debug from 'debug';
_debug.enable('liveWinApp:*');
const debug = _debug('liveWinApp:main');

import { listenToWidChange } from './utils/liveWinIPC';

import LiveWinContainer from './containers/LiveWinContainer';
debug('Live w. started');

listenToWidChange();

React.render(<LiveWinContainer/>, document.getElementById('react-live-win-root'));
