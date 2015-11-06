import React from 'react';
import { SystemWindowList } from '../components/systemWindowList.jsx';
import PreviewContainer from './PreviewContainer'

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:container/AppContainer');

debug('loaded!!')

export default class AppContainer extends React.Component {

  render() {
    return (
      <div>
          <SystemWindowList />
          <PreviewContainer />
      </div>
    );
  }

}
