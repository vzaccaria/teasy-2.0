import React from 'react';
import AppContainer from './containers/AppContainer';
import debug from './utils/debug';
import '../semantic/src/semantic.less';

var dd = debug('mainApp');
dd("Just loaded everithing")

React.render(<AppContainer/>, document.getElementById('react-root'));
